<?php
error_reporting(0);
$allowedsets = array("[BFZ]","[OGW]","[SOI]","[EMN]","[KLD]","[AER]","[AKH]","[HOU]");
function error_handler($msg){
	header("HTTP/1.0 400 Bad Request");
	echo($msg);
	die();	
}
$set = $_POST["set"];
$count = (int)$_POST["count"];
$land = $_POST["land"];
if($count == 0)error_handler("Не задано количество бустеров.");
if($count > 32)error_handler("Максимально 32 бустера.");
if(!in_array($set,$allowedsets))error_handler("Сет:~".$set."~ - отсутствует в базе.");
if(!empty($land))
if(!in_array($land,$allowedsets))error_handler("Сет для земли:~".$land."~ - отсутствует в базе.");
$boosters = array();
for ($w = 1; $w <= $count; $w++) {
$common = array();
$uncommons = array();
$rares = array();
$mythicrare = array();
$doublefacecom = array();
$doublefaceunc = array();
$doublefacemr = array();
$doublefacerare = array();
$setdata =  file_get_contents("../jsondata/".$set.".json");
$setdata = json_decode($setdata, true);	
$doublecardsalready = array();
$doublefacedsalready = array();
foreach($setdata["cards"] as $setcarddata){
	$cardname = $setcarddata["name"];
	if($setcarddata["layout"] == "aftermath"){
		$cardname = $setcarddata["names"][0]."/".$setcarddata["names"][1];
		if(in_array($cardname,$setcarddata["names"][0]))continue;
		else
			array_push($cardname,$setcarddata["names"][0]);
	}elseif($setcarddata["layout"] == "double-faced"){
		if(in_array($setcarddata["names"][0],$doublefacedsalready))continue;
		else
			array_push($setcarddata["names"][0],$doublefacedsalready);
	}
if($setcarddata["layout"] == "double-faced"){
if (strpos($setcarddata["mciNumber"],  "b") !== false)continue;
	if($setcarddata["rarity"] == "Common")
	array_push($doublefacecom,$cardname);
	elseif($setcarddata["rarity"] == "Uncommon")
	array_push($doublefaceunc,$cardname);
	elseif($setcarddata["rarity"] == "Rare")
	array_push($doublefacerare,$cardname);
	elseif($setcarddata["rarity"] == "Mythic Rare")
	array_push($doublefacemr,$cardname);
	
}elseif($setcarddata["layout"] == "meld"){
	if ($setcarddata["name"] == $setcarddata["names"][2])continue;

	if($setcarddata["rarity"] == "Common")
	array_push($doublefacecom,$cardname);
	elseif($setcarddata["rarity"] == "Uncommon")
	array_push($doublefaceunc,$cardname);
	elseif($setcarddata["rarity"] == "Rare")
	array_push($doublefacerare,$cardname);
	elseif($setcarddata["rarity"] == "Mythic Rare")
	array_push($doublefacemr,$cardname);

}else{
	if($setcarddata["rarity"] == "Common")
	array_push($common,$cardname);
	elseif($setcarddata["rarity"] == "Uncommon")
	array_push($uncommons,$cardname);
	elseif($setcarddata["rarity"] == "Rare")
	array_push($rares,$cardname);
	elseif($setcarddata["rarity"] == "Mythic Rare")
	array_push($mythicrare,$cardname);

}
}
$finaldatanames = array();
$commoncount = 10;
if($set == "[SOI]" || $set == "[EMN]"){
	$commoncount = 9;

if(rand(1,8) == 8){
	$randomcounter = rand(0,count($doublefaceunc)-1);
	array_push($finaldatanames,$doublefaceunc[$randomcounter]);
	unset($doublefaceunc[$randomcounter]);
	$doublefaceunc = array_values($doublefaceunc);	
}else{
	$randomcounter = rand(0,count($doublefacecom)-1);
	array_push($finaldatanames,$doublefacecom[$randomcounter]);
	unset($doublefacecom[$randomcounter]);
	$doublefacecom = array_values($doublefacecom);
}
if(rand(1,8) == 8){
	$commoncount = 8;
if(rand(1,8) == 8){
	$randomcounter = rand(0,count($doublefacemr)-1);
	array_push($finaldatanames,$doublefacemr[$randomcounter]);
	unset($doublefacemr[$randomcounter]);
	$doublefacemr = array_values($doublefacemr);	
}else{
	$randomcounter = rand(0,count($doublefacerare)-1);
	array_push($finaldatanames,$doublefacerare[$randomcounter]);
	unset($doublefacerare[$randomcounter]);
	$doublefacerare = array_values($doublefacerare);
}	
}
}

if(rand(1,8) == 8)
	array_push($finaldatanames,$mythicrare[rand(0,count($mythicrare)-1)]);
else
	array_push($finaldatanames,$rares[rand(0,count($rares)-1)]);
for ($i = 1; $i <= $commoncount; $i++) {
	$randomcounter = rand(0,count($common)-1);
	array_push($finaldatanames,$common[$randomcounter]);
	unset($common[$randomcounter]);
	$common = array_values($common);
}
for ($i = 1; $i <= 3; $i++) {
	$randomcounter = rand(0,count($uncommons)-1);
	array_push($finaldatanames,$uncommons[$randomcounter]);
	unset($uncommons[$randomcounter]);
	$uncommons = array_values($uncommons);
}
array_push($boosters,$finaldatanames);
}
$cardidarray = array();
$customdeck = array();
foreach($boosters as $boosterpack){
	$localcardid = array();
	foreach($boosterpack as $cardinner){
				$objectname = trim($cardinner);
			$prefilter = "";
			$afterfilter = "\t";
			if(preg_match('/[\p{Cyrillic}]/u', $objectname))
			{
				$prefilter = "\n";
				$afterfilter = "";
			}
			$string = file_get_contents("../datasets/".$set.".json");
			$json_a = json_decode($string, true);	
			$found = false;
			foreach ($json_a["ObjectStates"][0]["ContainedObjects"] as $key2=>$value2){
				if (strpos($value2["Nickname"],  $prefilter."".$objectname."".$afterfilter) !== false){
					$found = true;
					//die("FOUND");
					$cardid = $json_a["ObjectStates"][0]["DeckIDs"][$key2];
					$newset = array();
					$setid = substr($cardid, 0, strlen($cardid)-2);
					foreach ($json_a["ObjectStates"][0]["CustomDeck"] as $key3=>$value3){
						if($key3 == $setid){
							$breakfail = false;
							//die(print_r($value3));
							foreach ($customdeck as $value){
								
								if($setid == key($value)){
									$breakfail = true;
									break;
								}
							}
							if(!$breakfail)array_push($customdeck, array($setid=>$value3));
							break;
						}
					}

					//echo "<pre>".print_r($newset,true)."</pre>";
					//die();
					if(!isset($value2["States"]))$value2["States"] = "";
					array_push($localcardid, array($cardid,$value2["Nickname"],$value2["Description"],$value2["States"]));
					
					break;
				}
if(!empty($value2["States"])){
	foreach ($value2["States"] as $value5){
		
					$found = true;
					//die("FOUND");
					$cardid = $value5["CardID"];
					$newset = array();
					$setid = substr($cardid, 0, strlen($cardid)-2);
					foreach ($json_a["ObjectStates"][0]["CustomDeck"] as $key3=>$value3){
						if($key3 == $setid){
							$breakfail = false;
							//die(print_r($value3));
							foreach ($customdeck as $value){
								
								if($setid == key($value)){
									$breakfail = true;
									break;
								}
							}
							if(!$breakfail)array_push($customdeck, array($setid=>$value3));
							break;
						}
					}
					$cardid = $json_a["ObjectStates"][0]["DeckIDs"][$key2];
					$newset = array();
					$setid = substr($cardid, 0, strlen($cardid)-2);
					foreach ($json_a["ObjectStates"][0]["CustomDeck"] as $key3=>$value3){
						if($key3 == $setid){
							$breakfail = false;
							//die(print_r($value3));
							foreach ($customdeck as $value){
								
								if($setid == key($value)){
									$breakfail = true;
									break;
								}
							}
							if(!$breakfail)array_push($customdeck, array($setid=>$value3));
							break;
						}
					}
					//echo "<pre>".print_r($newset,true)."</pre>";
					//die();
					if (strpos($value5["Nickname"],  $prefilter."".$objectname."".$afterfilter) !== false)
					array_push($localcardid, array($cardid,$value2["Nickname"],$value2["Description"],$value2["States"]));
					
					break;
		
	}
}
			}
			if(!$found)error_handler("Не найдена карта:~".$objectname."~ в сете:".$set);

	}
	array_push($cardidarray, $localcardid);
}
$template = file_get_contents("../datasets/templatesingledeck.json");
$template = json_decode($template, true);
$posX = 0.0;
$posY = 0.0;
$posZ = 0;
$rotX = 0;
$rotY = 180;
$rotZ = 180;
$roundedposition = 0;
$placedbooster = 1;

unset($template["ObjectStates"]);
$template["ObjectStates"] = array();
for ($z = 0; $z <= $count-1; $z++) {
$cardarray = array();
$cardidonlylist = array();
foreach ($cardidarray[$z] as $cardval){
	array_push($cardidonlylist,$cardval[0]);
	array_push($cardarray,array('Name' => 'Card','Description' => $cardval[2],'Transform' => array('posX' => 0.831857741,'posY' => 1.86458218,'posZ' => 13.2053528,'rotX' => -0.00358864036,"rotY" => "180.016678",'rotZ' => 359.979523,'scaleX' => 1.0,'scaleY' => 1.0,'scaleZ' => 1.0),"Nickname" => $cardval[1],"CardID" => $cardval[0],"States" => $cardval[3]));
}
array_push($template["ObjectStates"],array('Name'=>'DeckCustom','Transform' => array('posX' => $posX,'posY' => $posY,'posZ' => $posZ,'rotX' => $rotX,"rotY" => $rotY,'rotZ' => $rotZ,'scaleX' => 1.0,'scaleY' => 1.0,'scaleZ' => 1.0),'CustomDeck'=>'CDECKREPLACE','ContainedObjects'=>$cardarray,'DeckIDs'=>$cardidonlylist));
$posX += 2.5;
$rounded = floor($placedbooster/6);
if($rounded != $roundedposition){
	$roundedposition = $rounded;
	$posZ -= 3.5;
	$posX = 0;
}
$placedbooster++;
}
$customdeckland = array();
if(!empty($land)){
	$arrayland = array();
$string = file_get_contents("../datasets/".$land.".json");
			$json_a = json_decode($string, true);	
			$found = false;
			foreach ($json_a["ObjectStates"][0]["ContainedObjects"] as $key2=>$value2){
							$prefilter = "";
			$afterfilter = "\t";
				
				
				
				if(preg_match("~Plains\s+\d+\\t~",$value2["Nickname"]) || preg_match("~Forest\s+\d+\\t~",$value2["Nickname"]) || preg_match("~Mountain\s+\d+\\t~",$value2["Nickname"]) || preg_match("~Swamp\s+\d+\\t~",$value2["Nickname"]) || preg_match("~Wastes\s+\d+\\t~",$value2["Nickname"])){
					$found = true;
					//die("FOUND");
					$cardid = $json_a["ObjectStates"][0]["DeckIDs"][$key2];
					$newset = array();
					$setid = substr($cardid, 0, strlen($cardid)-2);
					foreach ($json_a["ObjectStates"][0]["CustomDeck"] as $key3=>$value3){
						if($key3 == $setid){
							$breakfail = false;
							//die(print_r($value3));
							foreach ($customdeckland as $value){
								
								if($setid == key($value)){
									$breakfail = true;
									break;
								}
							}
							if(!$breakfail)array_push($customdeckland, array($setid=>$value3));
							break;
						}
					}

					//echo "<pre>".print_r($newset,true)."</pre>";
					//die();
					array_push($arrayland,array('Name' => 'Card','Description' => $value2["Description"],'Transform' => array('posX' => 0.831857741,'posY' => 1.86458218,'posZ' => 13.2053528,'rotX' => -0.00358864036,"rotY" => "180.016678",'rotZ' => 359.979523,'scaleX' => 1.0,'scaleY' => 1.0,'scaleZ' => 1.0),"Nickname" => $value2["Nickname"],"CardID" => $cardid));
					//break;
				}	
			}			
	if(empty($arrayland))error_handler("В сете:~".$land."~ нет земли.");
	$cardidonlylist = array();
	$cardarray = array();
foreach ($arrayland as $cardval){
	array_push($cardidonlylist,$cardval["CardID"]);
	array_push($cardarray,array('Name' => 'Card','Description' => $cardval["Description"],'Transform' => array('posX' => 0.831857741,'posY' => 1.86458218,'posZ' => 13.2053528,'rotX' => -0.00358864036,"rotY" => "180.016678",'rotZ' => 359.979523,'scaleX' => 1.0,'scaleY' => 1.0,'scaleZ' => 1.0),"Nickname" => $cardval["Nickname"],"CardID" => $cardval["CardID"]));
}
array_push($template["ObjectStates"],array('Name'=>'DeckCustom','Transform' => array('posX' => 0,'posY' => 0,'posZ' => 3.5,'rotX' => $rotX,"rotY" => $rotY,'rotZ' => 0,'scaleX' => 1.0,'scaleY' => 1.0,'scaleZ' => 1.0),'CustomDeck'=>'CDECKREPLACE2','ContainedObjects'=>$cardarray,'DeckIDs'=>$cardidonlylist));
}
$complainstring = '"CustomDeck": {';
foreach ($customdeck as $key4=>$value4){
	$keyinner = key($value4);
	$BackIsHidden = var_export($value4[$keyinner]["BackIsHidden"],true);
	$UniqueBack = var_export($value4[$keyinner]["UniqueBack"],true);
	if($key4 == count($customdeck)-1){
		$complainstring .= '"'.$keyinner.'": {
						"FaceURL": "'.$value4[$keyinner]["FaceURL"].'",
						"BackURL": "'.$value4[$keyinner]["BackURL"].'",
						"NumWidth": '.$value4[$keyinner]["NumWidth"].',
						"NumHeight": '.$value4[$keyinner]["NumHeight"].',
						"BackIsHidden": '.$BackIsHidden.',
						"UniqueBack": '.$UniqueBack.'
					}';	
	}else{
		$complainstring .= '"'.$keyinner.'": {
						"FaceURL": "'.$value4[$keyinner]["FaceURL"].'",
						"BackURL": "'.$value4[$keyinner]["BackURL"].'",
						"NumWidth": '.$value4[$keyinner]["NumWidth"].',
						"NumHeight": '.$value4[$keyinner]["NumHeight"].',
						"BackIsHidden": '.$BackIsHidden.',
						"UniqueBack": '.$UniqueBack.'
					},';
	}
}
$complainstring .= '},';
$jsonfile = json_encode($template, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
$jsonfile = preg_replace('~"CustomDeck": "CDECKREPLACE",~', $complainstring, $jsonfile);

$complainstring = '"CustomDeck": {';
foreach ($customdeckland as $key4=>$value4){
	$keyinner = key($value4);
	$BackIsHidden = var_export($value4[$keyinner]["BackIsHidden"],true);
	$UniqueBack = var_export($value4[$keyinner]["UniqueBack"],true);
	if($key4 == count($customdeckland)-1){
		$complainstring .= '"'.$keyinner.'": {
						"FaceURL": "'.$value4[$keyinner]["FaceURL"].'",
						"BackURL": "'.$value4[$keyinner]["BackURL"].'",
						"NumWidth": '.$value4[$keyinner]["NumWidth"].',
						"NumHeight": '.$value4[$keyinner]["NumHeight"].',
						"BackIsHidden": '.$BackIsHidden.',
						"UniqueBack": '.$UniqueBack.'
					}';	
	}else{
		$complainstring .= '"'.$keyinner.'": {
						"FaceURL": "'.$value4[$keyinner]["FaceURL"].'",
						"BackURL": "'.$value4[$keyinner]["BackURL"].'",
						"NumWidth": '.$value4[$keyinner]["NumWidth"].',
						"NumHeight": '.$value4[$keyinner]["NumHeight"].',
						"BackIsHidden": '.$BackIsHidden.',
						"UniqueBack": '.$UniqueBack.'
					},';
	}
}
$complainstring .= '},';
$jsonfile = preg_replace('~"CustomDeck": "CDECKREPLACE2",~', $complainstring, $jsonfile);
//echo("<pre>");
//print_r($cardidarray"]);
echo($jsonfile);
?>