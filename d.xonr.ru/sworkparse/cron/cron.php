<?php
set_time_limit(0);
    include_once("../inc/safemysql.class.php");
    include_once("../inc/simple_html_dom.php");
    function getwithcurl($url){
        $ch=curl_init();
        $timeout=60;
       $agents = array(
           'Mozilla/5.0 (Macintosh; Intel Mac OS X 10.7; rv:7.0.1) Gecko/20100101 Firefox/7.0.1',
           'Mozilla/5.0 (X11; U; Linux i686; en-US; rv:1.9.1.9) Gecko/20100508 SeaMonkey/2.0.4',
           'Mozilla/5.0 (Windows; U; MSIE 7.0; Windows NT 6.0; en-US)',
           'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10_6_7; da-dk) AppleWebKit/533.21.1 (KHTML, like Gecko) Version/5.0.5 Safari/533.21.1'
        
       );
        curl_setopt($ch,CURLOPT_USERAGENT,$agents[array_rand($agents)]);
        curl_setopt($ch, CURLOPT_URL, $url);
        curl_setopt($ch, CURLOPT_RETURNTRANSFER, 1);
        curl_setopt($ch, CURLOPT_CONNECTTIMEOUT, $timeout);
       
        $result=curl_exec($ch);
        curl_close($ch);
        return $result;
        }
        function workwithpage($page){
            $db = new SafeMySQL();
            $html = new simple_html_dom();
            $html->load($page);
            //foreach($html->find('div[class=workshopBrowseRow]') as $row){
                foreach($html->find('div[class=workshopItem]') as $workshopItem){
                    $link = $workshopItem->find('a')[0];
                    $name = $workshopItem->find('div[class=workshopItemTitle]')[0]->plaintext;
                    $parts = parse_url($link->href);
                    parse_str($parts['query'], $query);
                if($db->getOne('SELECT COUNT(*) FROM modstocheck WHERE steamid = ?s',$query['id']) == 0){
                    if(preg_match('/[\p{Cyrillic}]/u', $name))
                    $db->query("INSERT INTO modstocheck SET steamid=?s,containsrussian=1,namevar=?s",$query['id'],$name);
                    else
                    $db->query("INSERT INTO modstocheck SET steamid=?s,namevar=?s",$query['id'],$name);
                }else $db->query("UPDATE modstocheck SET namevar=?s WHERE steamid=?s",$name,$query['id']);
                
            }
                
           // }
        }
if("заменить" == $_GET["secret"]){
    $lastpage = 0;
    $pendingarray = array();
    $html = new simple_html_dom();
        $html->load(getwithcurl("https://steamcommunity.com/workshop/browse/?appid=286160&l=russian&browsesort=mostrecent&section=readytouseitems&browsefilter=mostrecent&actualsort=mostrecent&p=1"));
		//die($html);
		if(!empty($html)){
            $workshoppages = $html->find('div[class=workshopBrowsePagingControls]')[0];
            if($workshoppages != null){
                $lastpage = intval($workshoppages->find('a[class=pagelink]')[2]->plaintext);
                if($lastpage > 0){
                    workwithpage($html);
                    for ($x=$lastpage; $x>0; $x--){
                        while(true){ 
                            $html = new simple_html_dom();
                        $html->load(getwithcurl("https://steamcommunity.com/workshop/browse/?appid=286160&l=russian&browsesort=mostrecent&section=readytouseitems&browsefilter=mostrecent&actualsort=mostrecent&p=".$x));
                        if(!empty($html)){
                            $workshoppages = $html->find('div[class=workshopBrowsePagingInfo]')[0];
                            if($x != $lastpage && count($html->find('div[class=workshopItem]')) == 0)continue;
                            if($workshoppages != null && $html->find('div[class=workshopItem]')[0] != null){
                                    echo("OK:X".$x."ALL:".$lastpage."<br>");
                                    //die($html);
                                    workwithpage($html);
                                    break;
                            }else{
                                //array_push($pendingarray,$x);
                                echo "NOTOK:X".$x."ALL:".$lastpage."errorgetworkshop<br>";
                                continue;
                            }
                        }
                    }
                        //if($x != 730)
                        //die($html);
                        //sleep(2);
                    }
                    
                }else{echo "no last page";}
            }else{echo "errorgetworkshop";}
        }
/*while(true){ 
            if(count($pendingarray) == 0)break;
        foreach ($pendingarray as $x){
            $html = new simple_html_dom();
            $html->load(getwithcurl("https://steamcommunity.com/workshop/browse/?appid=286160&l=russian&browsesort=mostrecent&section=readytouseitems&browsefilter=mostrecent&actualsort=mostrecent&p=".$x));
            if(!empty($html)){
                $workshoppages = $html->find('div[class=workshopBrowsePagingInfo]')[0];
                if($x != $lastpage && $html->find('div[class=workshopItem]')[29] == null)array_push($pendingarray,$x);
                if($workshoppages != null){
                        echo("FIX:X".$x."ALL:".$lastpage."<br>");
                        //die($html);
                        workwithpage($html);
                        if (($key = array_search($x, $pendingarray)) !== false) {
                            unset($pendingarray[$key]);
                        }
                }else{
                    array_push($pendingarray,$x);
                    echo "errorgetworkshop<br>";
                }
            }
        }
    }*/
    $db = new SafeMySQL();
    $entries = $db->getAll("SELECT * FROM modstocheck WHERE containsrussian IS NULL");
    foreach($entries as $entry){
        $html = new simple_html_dom();
        $html->load(getwithcurl("https://steamcommunity.com/sharedfiles/filedetails/?id=".$entry['steamid']."&l=russian"));
        //die($html);
        if(!empty($html)){
            $name = $html->find('div[class=workshopItemTitle]')[0];
            if($name != null){
                $name = $name->plaintext;
                $description = $html->find('div[class=workshopItemDescription]')[0];
                if($description != null){
                    $description = $description->plaintext;
                    if(preg_match('/[\p{Cyrillic}]/u', $description) || preg_match('/[\p{Cyrillic}]/u', $name))
                    {
                        $db->query("UPDATE modstocheck SET containsrussian=1,namevar=?s WHERE id=?s",$name,$entry['id']);
                    }else $db->query("UPDATE modstocheck SET containsrussian=0,namevar=?s WHERE id=?s",$name,$entry['id']);
                }else{echo "no description<br>";}
            }else{echo "no name<br>";}
        }
        //sleep(2);
    }
        /*$html = new simple_html_dom();
        $html->load(getwithcurl("https://steamcommunity.com/sharedfiles/filedetails/?id=1459131096&l=russian"));
		//die($html);
		if(!empty($html)){
            $name = $html->find('div[class=workshopItemTitle]')[0];
            if($name != null){
                $name = $name->plaintext;
                $description = $html->find('div[class=workshopItemDescription]')[0];
                if($description != null){
                    $description = $description->plaintext;
                    if(preg_match('/[\p{Cyrillic}]/u', $description) || preg_match('/[\p{Cyrillic}]/u', $name))
                    {
                        echo("russianletters");
                    }else echo("norussianletters");
                }else{echo "no last page";}
            }else{echo "errorgetworkshop";}
        }
        */
}