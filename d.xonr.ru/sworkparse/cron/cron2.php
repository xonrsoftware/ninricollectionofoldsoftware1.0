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
            foreach($html->find('div[class=workshopBrowseRow]') as $row){
                foreach($row->find('div[class=workshopItem]') as $workshopItem){
                    $link = $row->find('a[class=ugc]')[0];
                    $name = $row->find('div[class=workshopItemTitle]')[0]->plaintext;
                    $parts = parse_url($link->href);
                    parse_str($parts['query'], $query);
                if($db->getOne('SELECT COUNT(*) FROM modstocheck WHERE id = ?s',$query['id']) == 0){
                    if(preg_match('/[\p{Cyrillic}]/u', $name))
                    $db->query("INSERT INTO modstocheck SET id=?s,containsrussian=1",$query['id']);
                    else
                    $db->query("INSERT INTO modstocheck SET id=?s",$query['id']);
                }
                
            }
                
            }
        }
if("заменить" == $_GET["secret"]){
    $db = new SafeMySQL();
  /*  $html = new simple_html_dom();
        $html->load(getwithcurl("https://steamcommunity.com/workshop/browse/?appid=286160&l=russian&browsesort=mostrecent&section=readytouseitems&actualsort=mostrecent&p=1"));
		//die($html);
		if(!empty($html)){
            $workshoppages = $html->find('div[class=workshopBrowsePagingControls]')[0];
            if($workshoppages != null){
                $lastpage = intval($workshoppages->find('a[class=pagelink]')[2]->plaintext);
                if($lastpage > 0){
                    for ($x=2; $x<=$lastpage; $x++){
                        $html = new simple_html_dom();
                        $html->load(getwithcurl("https://steamcommunity.com/workshop/browse/?appid=286160&l=russian&browsesort=mostrecent&section=readytouseitems&actualsort=mostrecent&p=".$x));
                        if(!empty($html)){
                            $workshoppages = $html->find('div[class=workshopBrowsePagingControls]')[0];
                            if($workshoppages != null){
                                $lastpage2 = intval($workshoppages->find('a[class=pagelink]')[2]->plaintext);
                                if($lastpage2 > 0){
                                    echo("OK:X".$x."ALL:".$lastpage);
                                    workwithpage($html);
                                }else{echo "no last page";}
                            }else{echo "errorgetworkshop";}
                        }
                        sleep(2);
                    }
                    workwithpage($html);
                }else{echo "no last page";}
            }else{echo "errorgetworkshop";}
        }*/
        $entries = $db->getAll("SELECT * FROM modstocheck WHERE containsrussian IS NULL");
        foreach($entries as $entry){
            $html = new simple_html_dom();
            $html->load(getwithcurl("https://steamcommunity.com/sharedfiles/filedetails/?id=".$entry['id']."&l=russian"));
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
            die();
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