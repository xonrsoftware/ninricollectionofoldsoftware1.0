<?php
//STAGE 1 REFORMATING ORIGINAL CustomDeck BLOCK
$allowedsets = array("[BFZ]","[OGW]","[SOI]","[EMN]","[KLD]","[AER]","[AKH]","[HOU]");
$currenttextureid = 1;
$storedmaxland = array();
function error_handler($msg){
	header("HTTP/1.0 400 Bad Request");
	echo($msg);
	die();	
}
//$lastdecknum = -1;
foreach($allowedsets as $valuemain){
	$customdecksoriginal = array();
	$string = file_get_contents("../original/".$valuemain.".json");
	$json_a = json_decode($string, true);


	foreach ($json_a["ObjectStates"] as $value){
		foreach ($value["ContainedObjects"] as $value2){
			if($value2["Name"] == "Card"){
				if(!empty($value2["CustomDeck"])){
					$breakfail = false;
					//die(print_r(key($value2["CustomDeck"])));
					foreach ($customdecksoriginal as $value){
						
						if(key($value2["CustomDeck"]) == key($value)){
							$breakfail = true;
							break;
						}
					}
					if(key($value2["CustomDeck"]) > $lastdecknum)
					$lastdecknum = key($value2["CustomDeck"]);
					if(!$breakfail){
						array_push($customdecksoriginal, $value2["CustomDeck"]);
					}
					
				}else{
					$numberofdeck = $value2["CardID"]/100;
					
					$breakfail = false;
					foreach ($json_a["ObjectStates"] as $value){
						if(!empty($value["CustomDeck"])){
						foreach ($value["CustomDeck"] as $key=>$value3){
							//die("DDW".$key);
							if($key == $numberofdeck){
								foreach ($customdecksoriginal as $value){
									
									if($key == key($value)){
										$breakfail = true;
										break;
									}
									
								}	
								if($key > $lastdecknum)
								$lastdecknum = $key;
								if(!$breakfail)
								array_push($customdecksoriginal, array($key=>$value3));
							}	
						}
						}
					}
					

				}
				if(!empty($value2["States"])){
	foreach ($value2["States"] as $value5){
				if(!empty($value5["CustomDeck"])){
					$breakfail = false;
					//die(print_r(key($value2["CustomDeck"])));
					foreach ($customdecksoriginal as $value){
						
						if(key($value5["CustomDeck"]) == key($value)){
							$breakfail = true;
							break;
						}
					}
					if(key($value5["CustomDeck"]) > $lastdecknum)
					$lastdecknum = key($value5["CustomDeck"]);
					if(!$breakfail){
						array_push($customdecksoriginal, $value5["CustomDeck"]);
					}
					
				}else{
					$numberofdeck = $value5["CardID"]/100;
					
					$breakfail = false;
					foreach ($json_a["ObjectStates"] as $value){
						if(!empty($value["CustomDeck"])){
						foreach ($value["CustomDeck"] as $key=>$value3){
							//die("DDW".$key);
							if($key == $numberofdeck){
								foreach ($customdecksoriginal as $value){
									
									if($key == key($value)){
										$breakfail = true;
										break;
									}
									
								}	
								if($key > $lastdecknum)
								$lastdecknum = $key;
								if(!$breakfail)
								array_push($customdecksoriginal, array($key=>$value3));
							}	
						}
						}
					}
					

				}
				}
				}
			}

		}		
	}
	
//COUNT AND STORE LAND COUNT
$maximumIsland = 0;
$maximumMountain = 0;
$maximumForest = 0;
$maximumPlains = 0;
$maximumSwamp = 0;
$maximumWastes = 0;

					foreach ($json_a["ObjectStates"] as $value){
	foreach ($value["ContainedObjects"] as $value2){
if( preg_match ( '~Island [0-9]\t\r\n~', $value2["Nickname"] ))
$maximumIsland++;
if( preg_match ( '~Mountain [0-9]\t\r\n~', $value2["Nickname"] ))
$maximumMountain++;
if( preg_match ( '~Forest [0-9]\t\r\n~', $value2["Nickname"] ))
$maximumForest++;
if( preg_match ( '~Plains [0-9]\t\r\n~', $value2["Nickname"] ))
$maximumPlains++;
if( preg_match ( '~Swamp [0-9]\t\r\n~', $value2["Nickname"] ))
$maximumSwamp++;
if( preg_match ( '~Wastes [0-9]\t\r\n~', $value2["Nickname"] ))
$maximumWastes++;		
	}
}
array_push($storedmaxland,array($valuemain=>array('maximumIsland'=>$maximumIsland,'maximumMountain'=>$maximumMountain,'maximumForest'=>$maximumForest,'maximumPlains'=>$maximumPlains,'maximumSwamp'=>$maximumSwamp,'maximumWastes'=>$maximumWastes)));	
		if(empty($customdecksoriginal))continue;//ALREADY WORKED OUT
		//DONT NEED CustomDeck FOR Everything
		foreach ($json_a["ObjectStates"] as &$value){
		foreach ($value["ContainedObjects"] as &$value2){
			unset($value2["CustomDeck"]);
			unset($value2["CardID"]);
		}
		}
usort($customdecksoriginal, function ($a, $b) { return key($a) - key($b); });

//STAGE 2 REPLACING CardID by OWN
$originalid = array();
$rewriteid = array();
$finalcustomdeck = array();
	foreach ($customdecksoriginal as $key=>$value3){
		array_push($originalid,key($value3));
		array_push($rewriteid,$currenttextureid);
		$digcount = strlen($key);
		$tempfield = array($currenttextureid=>$value3[key($value3)]);
array_push($finalcustomdeck, $tempfield);
/*	foreach ($json_a["ObjectStates"] as &$value){
		foreach ($value["ContainedObjects"] as $key2=>&$value2){
			if($value2["Name"] == "Card"){
				$equal = true;
				if(strlen($value2["CardID"]) != $digcount+2)
					$equal = false;
				else{
$firstdig = substr($value2["CardID"], 0, $digcount);
if($firstdig != $key)$equal = false;
					
				}
				if($equal){
				$valold = substr($value2["CardID"], -2);
				//print("ID:".$value2["CardID"]."</br>"); 
				//print("VALOLD:".$key."</br>");
				//print("NEWVAL:".$currenttextureid."</br>");
				$mynewid = (int)($currenttextureid."".$valold);
			//	print("NEWID:".$mynewid."</br>");
				$value2["CardID"] = $mynewid;
				$json_a["ObjectStates"][0]["DeckIDs"][$key2] = $mynewid;
				}
			}
		}
	}*/
$currenttextureid++;
	}

	foreach ($json_a["ObjectStates"][0]["DeckIDs"] as $key3=>&$value3){
		$firstdig = substr($value3, 0, strlen($value3)-2);
		//echo "<pre>".print_r($originalid,true)."</pre>";
		//echo "<pre>".print_r($rewriteid,true)."</pre>";
		if(in_array($firstdig,$originalid)){
			$keyval = array_search($firstdig,$originalid);
			$valold = substr($value3, -2);
				//print("VALOLD:".$keyval."</br>");
			$value3 = intval($rewriteid[$keyval]."".$valold);
						
			//	print("NEWVAL:".$value3."</br>");
			//die($firstdig);
		}
	}
	foreach ($json_a["ObjectStates"] as &$value){
		foreach ($value["ContainedObjects"] as &$value2){
			
			if(!empty($value2["States"])){
				foreach ($value2["States"] as &$value5){
					
		$firstdig = substr($value5["CardID"], 0, strlen($value5["CardID"])-2);
		
		if(in_array($firstdig,$originalid)){
			
			$keyval = array_search($firstdig,$originalid);
			$valold = substr($value5["CardID"], -2);
//			error_handler(print_r($originalid)."<BR>".print_r($rewriteid));
//error_handler($rewriteid[$keyval]."".$valold.":".$value5["CardID"]);
			$value5["CardID"] = intval($rewriteid[$keyval]."".$valold);

		}
		}
	}
}
}
//FINAL
		echo "<pre>".print_r($finalcustomdeck,true)."</pre>";
		echo "<pre>".print_r($customdecksoriginal,true)."</pre>";
	//die();
//WHY THIS IS NOT STANDART JS? 
$complainstring = '"CustomDeck": {';
foreach ($finalcustomdeck as $key4=>$value4){
	$keyinner = key($value4);
	$BackIsHidden = var_export($value4[$keyinner]["BackIsHidden"],true);
	$UniqueBack = var_export($value4[$keyinner]["UniqueBack"],true);
if($key4 == count($finalcustomdeck)-1){
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
$json_a["ObjectStates"][0]["CustomDeck"]="CDECKREPLACE";
unset($json_a["TabStates"]);
$jsonfile = json_encode($json_a, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
$jsonfile = preg_replace('~"CustomDeck": "CDECKREPLACE",~', $complainstring, $jsonfile);
//die();
//$json_a["ObjectStates"][0]["CustomDeck"] = $customdecksoriginal;	
//echo "<pre>".print_r($json_a["ObjectStates"][0]["CustomDeck"],true)."</pre>";
//var_dump($customdecksoriginal);

//die(json_encode($json_a, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));

$fp = fopen('../datasets/'.$valuemain.'.json', 'w');
fwrite($fp, $jsonfile);
fclose($fp);	

}
$fp = fopen('../datasets/landval.json', 'w');
fwrite($fp, json_encode($storedmaxland, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT));
fclose($fp);	
?>