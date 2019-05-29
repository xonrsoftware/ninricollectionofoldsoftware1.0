<?php
error_reporting(E_ERROR);
$allowedsets = array("[BFZ]","[OGW]","[SOI]","[EMN]","[KLD]","[AER]","[AKH]","[HOU]");
function error_handler($msg){
	header("HTTP/1.0 400 Bad Request");
	echo($msg);
	die();	
}
$userrequestsetlist = array();
$usernativesetlist = array();
$usercsv = array();
if ($_FILES['file']['size'] > 5000000) {
	error_handler("Достигнут лимит размера таблицы, больше 5 МБ.");
}

$mimes = array('application/vnd.ms-excel','text/plain','text/csv','text/tsv');
if(!in_array(mime_content_type($_FILES['file']['tmp_name']),$mimes)){
	error_handler("Неверный тип файла.");
}

$path_parts = pathinfo($_FILES["file"]["name"]);
$extension = $path_parts['extension'];

if ($_FILES['file']['error'] == UPLOAD_ERR_OK               //checks for errors
		&& is_uploaded_file($_FILES['file']['tmp_name'])) {
	if($extension == "csv"){
		//error_handler("TEEST.");
		try{
			
			$filestring = file_get_contents($_FILES['file']['tmp_name']);
			//$encoding = mb_detect_encoding($filestring, 'ASCII,UTF-8,ISO-8859-15');
			//if($encoding != "UTF-8"){
				$in = fopen($_FILES['file']['tmp_name'], "r");
    while (($data = fgetcsv($in, 1000, ",")) !== FALSE) {
		//error_handler(print_r($data));
		if(!empty($data[1]))
					array_push($usercsv,$data);
				}	
			//}else{
				//$usercsv = array_map('str_getcsv', $filestring);
			//}

		}catch (Exception $e) {
			error_handler("Неверный формат таблицы .csv");
		}
	}else{
		$in = fopen($_FILES['file']['tmp_name'], "r");
		while(($line = fgets($in)) !== false) {
			$encoding = mb_detect_encoding($line, 'Windows-1251,ASCII,UTF-8,ISO-8859-15');
			if($encoding != "UTF-8")
			$line = mb_convert_encoding($line, 'UTF-8');
		//error_handler($line);
			if(empty($line) || preg_match("~^//~",$line))continue;
			$qun = 0;
			$name = "";
			$set = "";
			$line = str_replace(" // ", "/", $line);
			$line = str_replace(" / ", "/", $line);
			if(preg_match("~^.*:\s+(\d+)\s+(.*)\s*$~",$line,$matches)){
				$qun = trim($matches[1]);
				$name = trim($matches[2]);
			}elseif(preg_match("~^.*:\s+(\d+)\s+(.*)\s+[[](.*)[]]\s*$~",$line,$matches)){
				$qun = trim($matches[1]);
				$name = trim($matches[2]);
				$set =  trim($matches[3]);
			}elseif(preg_match("~^(\d+)\s+(.*)\s+[[](.*)[]]\s*$~",$line,$matches)){
				$qun = trim($matches[1]);
				$name = trim($matches[2]);
				$set =  trim($matches[3]);
			}elseif(preg_match("~^(\d+)\s+(.*)\s*$~",$line,$matches)){
				$qun = trim($matches[1]);
				$name = trim($matches[2]);
			}
			if(!empty($set))$set = "[".$set."]";
			if($qun == 0 && !empty($name))error_handler("Не задано количество для карты:".$name);
			elseif($qun > 0 && !empty($name)){
				array_push($usercsv,array($qun,$name,$set));
			}
		}
		//error_handler(print_r($usercsv));
	}

}else error_handler("Ошибка загрузки файла");

if(empty($usercsv))  error_handler("Формат файла не распознан");
foreach ($usercsv as $csvval){
	//error_handler("<pre>".print_r($csvval)."</pre>");
	$csvval[0] = trim($csvval[0]);
	$csvval[1] = trim($csvval[1]);
	$csvval[2] = trim($csvval[2]);
	if(trim($csvval[0]) == "|SETS|"){
		$csvval[1] = trim($csvval[1]);
		if(!empty($csvval[1])){
			$usersets = explode(",", $csvval[1]);
			if(!empty($usersets)){
				foreach ($usersets as $val){
					if(in_array($val,$allowedsets)){
						if(!in_array($val,$userrequestsetlist))
						array_push($userrequestsetlist,$val);
						if(!in_array($val,$usernativesetlist))
						array_push($usernativesetlist,$val);
					}else error_handler("Сет ~".$val."~ отсутствует в базе.");
				}
			}
		}
	}else{
		if((int)$csvval[0] == 0){
			error_handler("Не задано количество для карты:".$csvval[1]);
		}
		$csvval[2] = trim($csvval[2]);
		if(!empty($csvval[2])){
			if(in_array($csvval[2],$allowedsets)){
				if(!in_array($csvval[2],$userrequestsetlist))
				array_push($userrequestsetlist,$csvval[2]);
			}else error_handler("Сет ~".$csvval[2]."~ отсутствует в базе.");
		}
	}
}
//if(empty($userrequestsetlist)){
$userrequestsetlist = array_reverse($allowedsets);
$usernativesetlist = array_reverse($allowedsets);
//error_handler("Не задан не один сет.");	
//}
function returnnameofobject($cleanname,$setname,&$Ilandtakenarray,&$Plainstakenarray,&$Mountaintakenarray,&$Swamptakenarray,&$Foresttakenarray,&$Wastestakenarray,$landcountdata,$ignoredie = false){
	//error_handler(print_r($Ilandtakenarray));
	//error_handler("EEE".$setname);
	switch ($cleanname) {
	case "|Остров|":
	case "Остров":	
	case "|Island|":
	case "Island":
		$landcountarray = array();
		foreach($landcountdata as $landvalcount){
			if(key($landvalcount) == $setname) 
			$landcountarray = $landvalcount[$setname];
		}
		if($landcountarray["maximumIsland"] == 0 && !$ignoredie)error_handler("В выбраном сете ~".$setname."~ недостаточно земли типа: Island / Остров");
		elseif($landcountarray["maximumIsland"] == 0 && $ignoredie) return "";
		if((count($Ilandtakenarray[$setname]) == 0 || count($Ilandtakenarray[$setname]) == $landcountarray["maximumIsland"]) || $enablelandfullrandom){
			$Ilandtakenarray[$setname] = array();
			$randomland = rand(1,$landcountarray["maximumIsland"]);
			$objectname = "Island ".$randomland;
			array_push($Ilandtakenarray[$setname],$randomland);
		}else{
			$tmpval = array();
			for ($i = 1; $i <= $landcountarray["maximumIsland"]; $i++) {
				if(!in_array($i,$Ilandtakenarray[$setname]))
				array_push($tmpval,$i);
			}
			if(count($tmpval) == 1){
				$objectname = "Island ".$tmpval[0];
				array_push($Ilandtakenarray[$setname],$tmpval[0]);
				
			}else{
				$randomland = rand(0,count($tmpval)-1);	
				$objectname = "Island ".$tmpval[$randomland];
				array_push($Ilandtakenarray[$setname],$tmpval[$randomland]);
			}
		}
		//STRT
		/*			$string = file_get_contents("datasets/".$setname.".json");
			$json_a = json_decode($string, true);	
			$found = false;
			foreach ($json_a["ObjectStates"][0]["ContainedObjects"] as $key2=>$value2){
				if (strpos($value2["Nickname"],  $objectname."\t") !== false){
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
					array_push($cardidarray, array($cardid,$value2["Nickname"],$value2["Description"],$value2["States"]));
					break;
				}	
			}
			if(!$found)die("Не найдена карта:".$objectname." в сете:".$setname);*/
		return $objectname;
		//ED
		
		break;
	case "|Гора|":
	case "Гора":	
	case "|Mountain|":
	case "Mountain":
		$landcountarray = array();
		foreach($landcountdata as $landvalcount){
			if(key($landvalcount) == $setname) 
			$landcountarray = $landvalcount[$setname];
		}
		if($landcountarray["maximumMountain"] == 0 && !$ignoredie)error_handler("В выбраном сете ~".$setname."~ недостаточно земли типа: Mountain / Гора");
		elseif($landcountarray["maximumMountain"] == 0 && $ignoredie) return "";
		if((count($Mountaintakenarray[$setname]) == 0 || count($Mountaintakenarray[$setname]) == $landcountarray["maximumMountain"]) || $enablelandfullrandom){
			$Mountaintakenarray[$setname] = array();
			$randomland = rand(1,$landcountarray["maximumMountain"]);
			$objectname = "Mountain ".$randomland;
			array_push($Mountaintakenarray[$setname],$randomland);
		}else{
			$tmpval = array();
			for ($i = 1; $i <= $landcountarray["maximumMountain"]; $i++) {
				if(!in_array($i,$Mountaintakenarray[$setname]))
				array_push($tmpval,$i);
			}
			if(count($tmpval) == 1){
				$objectname = "Mountain ".$tmpval[0];
				array_push($Mountaintakenarray[$setname],$tmpval[0]);
				
			}else{
				$randomland = rand(0,count($tmpval)-1);	
				$objectname = "Mountain ".$tmpval[$randomland];
				array_push($Mountaintakenarray[$setname],$tmpval[$randomland]);
			}
		}
		return $objectname;
		break;
	case "|Лес|":
	case "Лес":	
	case "|Forest|":
	case "Forest":
		$landcountarray = array();
		foreach($landcountdata as $landvalcount){
			if(key($landvalcount) == $setname) 
			$landcountarray = $landvalcount[$setname];
		}
		if($landcountarray["maximumForest"] == 0 && !$ignoredie)error_handler("В выбраном сете ~".$setname."~ недостаточно земли типа: Forest / Лес");
		elseif($landcountarray["maximumForest"] == 0 && $ignoredie) return "";
		
		if((count($Foresttakenarray[$setname]) == 0 || count($Foresttakenarray[$setname]) == $landcountarray["maximumForest"]) || $enablelandfullrandom){
			$Foresttakenarray[$setname] = array();
			$randomland = rand(1,$landcountarray["maximumForest"]);
			$objectname = "Forest ".$randomland;
			
			array_push($Foresttakenarray[$setname],$randomland);
		}else{
			$tmpval = array();
			for ($i = 1; $i <= $landcountarray["maximumForest"]; $i++) {
				if(!in_array($i,$Foresttakenarray[$setname]))
				array_push($tmpval,$i);
			}
			if(count($tmpval) == 1){
				$objectname = "Forest ".$tmpval[0];
				array_push($Foresttakenarray[$setname],$tmpval[0]);
				
			}else{
				$randomland = rand(0,count($tmpval)-1);	
				$objectname = "Forest ".$tmpval[$randomland];
				array_push($Foresttakenarray[$setname],$tmpval[$randomland]);
			}
		}
		//error_handler($objectname); 
		return $objectname;
		break;
	case "|Равнина|":	
	case "Равнина":
	case "|Plains|":
	case "Plains":
		foreach($landcountdata as $landvalcount){
			if(key($landvalcount) == $setname) 
			$landcountarray = $landvalcount[$setname];
		}
		if($landcountarray["maximumPlains"] == 0 && !$ignoredie)error_handler("В выбраном сете ~".$setname."~ недостаточно земли типа: Plains / Поля");
		elseif($landcountarray["maximumPlains"] == 0 && $ignoredie) return "";
		if((count($Plainstakenarray[$setname]) == 0 || count($Plainstakenarray[$setname]) == $landcountarray["maximumPlains"]) || $enablelandfullrandom){
			$Plainstakenarray[$setname] = array();
			$randomland = rand(1,$landcountarray["maximumPlains"]);
			$objectname = "Plains ".$randomland;
			array_push($Plainstakenarray[$setname],$randomland);
		}else{
			$tmpval = array();
			for ($i = 1; $i <= $landcountarray["maximumPlains"]; $i++) {
				if(!in_array($i,$Plainstakenarray[$setname]))
				array_push($tmpval,$i);
			}
			if(count($tmpval) == 1){
				$objectname = "Plains ".$tmpval[0];
				array_push($Plainstakenarray[$setname],$tmpval[0]);
				
			}else{
				$randomland = rand(0,count($tmpval)-1);	
				$objectname = "Plains ".$tmpval[$randomland];
				array_push($Plainstakenarray[$setname],$tmpval[$randomland]);
			}
		}
		return $objectname;
		break;
	case "|Болото|":
	case "Болото":	
	case "|Swamp|":
	case "Swamp":
		foreach($landcountdata as $landvalcount){
			if(key($landvalcount) == $setname) 
			$landcountarray = $landvalcount[$setname];
		}
		if($landcountarray["maximumSwamp"] == 0 && !$ignoredie)error_handler("В выбраном сете ~".$setname."~ недостаточно земли типа: Swamp / Болото");
		elseif($landcountarray["maximumSwamp"] == 0 && $ignoredie) return "";
		if((count($Swamptakenarray[$setname]) == 0 || count($Swamptakenarray[$setname]) == $landcountarray["maximumSwamp"]) || $enablelandfullrandom){
			$Swamptakenarray[$setname] = array();
			$randomland = rand(1,$landcountarray["maximumSwamp"]);
			$objectname = "Swamp ".$randomland;
			array_push($Swamptakenarray[$setname],$randomland);
		}else{
			$tmpval = array();
			for ($i = 1; $i <= $landcountarray["maximumSwamp"]; $i++) {
				if(!in_array($i,$Swamptakenarray[$setname]))
				array_push($tmpval,$i);
			}
			if(count($tmpval) == 1){
				$objectname = "Swamp ".$tmpval[0];
				array_push($Swamptakenarray[$setname],$tmpval[0]);
				
			}else{
				$randomland = rand(0,count($tmpval)-1);	
				$objectname = "Swamp ".$tmpval[$randomland];
				array_push($Swamptakenarray[$setname],$tmpval[$randomland]);
			}
		}
		return $objectname;
		break;	
	case "|Пустоши|":	
	case "Пустоши":
	case "|Wastes|":
	case "Wastes":
		foreach($landcountdata as $landvalcount){
			if(key($landvalcount) == $setname) 
			$landcountarray = $landvalcount[$setname];
		}
		if($landcountarray["maximumWastes"] == 0 && !$ignoredie)error_handler("В выбраном сете ~".$setname."~ недостаточно земли типа: Wastes / Пустоши");
		elseif($landcountarray["maximumWastes"] == 0 && $ignoredie) return "";
		if((count($Wastestakenarray[$setname]) == 0 || count($Wastestakenarray[$setname]) == $landcountarray["maximumWastes"]) || $enablelandfullrandom){
			$Wastestakenarray[$setname] = array();
			$randomland = rand(1,$landcountarray["maximumWastes"]);
			$objectname = "Wastes ".$randomland;
			array_push($Wastestakenarray[$setname],$randomland);
		}else{
			$tmpval = array();
			for ($i = 1; $i <= $landcountarray["maximumWastes"]; $i++) {
				if(!in_array($i,$Wastestakenarray[$setname]))
				array_push($tmpval,$i);
			}
			if(count($tmpval) == 1){
				$objectname = "Wastes ".$tmpval[0];
				array_push($Wastestakenarray[$setname],$tmpval[0]);
				
			}else{
				$randomland = rand(0,count($tmpval)-1);	
				$objectname = "Wastes ".$tmpval[$randomland];
				array_push($Wastestakenarray[$setname],$tmpval[$randomland]);
			}
		}
		return $objectname;
		break;	
	default:
		$cleanname = str_replace(" // ", "/", $cleanname);
		$cleanname = str_replace(" / ", "/", $cleanname);
		$cleanname = preg_replace("~^AE~", "Ae", $cleanname);
		return trim($cleanname);
	}
}
//START COLLECTDATA
$string = file_get_contents("../datasets/landval.json");
$landcountdata = json_decode($string, true);	
$customdeck = array();
$cardidarray = array();
$Ilandtakenarray = array();
$Plainstakenarray = array();
$Mountaintakenarray = array();
$Swamptakenarray = array();
$Foresttakenarray = array();
$Wastestakenarray = array();
foreach ($userrequestsetlist as $userrequestsetlistval){
	$Ilandtakenarray[$userrequestsetlistval] = array();
	$Plainstakenarray[$userrequestsetlistval] = array();
	$Mountaintakenarray[$userrequestsetlistval] = array();
	$Swamptakenarray[$userrequestsetlistval] = array();
	$Foresttakenarray[$userrequestsetlistval] = array();
	$Wastestakenarray[$userrequestsetlistval] = array();
}
foreach ($usercsv as $csvval){
	$cleanname = trim($csvval[1]);
	$objectname = $cleanname;
	if(trim($csvval[0]) == "|SETS|")continue;
	$csvval[2] = trim($csvval[2]);
	if(!empty($csvval[2])){
		for ($i = 1; $i <= $csvval[0]; $i++) {
			$objectname = returnnameofobject($cleanname,$csvval[2],$Ilandtakenarray,$Plainstakenarray,$Mountaintakenarray,$Swamptakenarray,$Foresttakenarray,$Wastestakenarray,$landcountdata);
			$prefilter = "";
			$afterfilter = "\t";
			if(preg_match('/[\p{Cyrillic}]/u', $objectname))
			{
				$prefilter = "\n";
				$afterfilter = "";
			}
			$string = file_get_contents("../datasets/".$csvval[2].".json");
			$json_a = json_decode($string, true);	
			$found = false;
			foreach ($json_a["ObjectStates"][0]["ContainedObjects"] as $key2=>$value2){
				//error_handler($objectname);
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
					array_push($cardidarray, array($cardid,$value2["Nickname"],$value2["Description"],$value2["States"]));
					//break;
				}
if($found && !empty($value2["States"])){
	foreach ($value2["States"] as $value5){
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
					if (strpos($value5["Nickname"],  $prefilter."".$objectname."".$afterfilter) !== false){
						$found = true;
					array_push($cardidarray, array($cardid,$value2["Nickname"],$value2["Description"],$value2["States"]));
					}
				//	break;
		
	}
}
			}
			if(!$found)error_handler("Не найдена карта:~".$objectname."~ в сете:".$csvval[2]);
		}
	}else{
		for ($i = 1; $i <= $csvval[0]; $i++) {
			$found = false;
			foreach ($usernativesetlist as $setvval){
				$objectname = returnnameofobject($cleanname,$setvval,$Ilandtakenarray,$Plainstakenarray,$Mountaintakenarray,$Swamptakenarray,$Foresttakenarray,$Wastestakenarray,$landcountdata,true);
				if(empty($objectname)) continue;
				$prefilter = "";
				$afterfilter = "\t";
				if(preg_match('/[\p{Cyrillic}]/u', $objectname))
				{
					$prefilter = "\n";
					$afterfilter = "";
				}
				$string = file_get_contents("../datasets/".$setvval.".json");
				$json_a = json_decode($string, true);	
				foreach ($json_a["ObjectStates"][0]["ContainedObjects"] as $key2=>$value2){
					if (strpos($value2["Nickname"],  $prefilter."".$objectname."".$afterfilter) !== false){
						$found = true;
						//die("FOUND");
						$cardid = $json_a["ObjectStates"][0]["DeckIDs"][$key2];
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
						array_push($cardidarray, array($cardid,$value2["Nickname"],$value2["Description"],$value2["States"]));
					//	break;
					//}else{
					}
if($found && !empty($value2["States"])){
	foreach ($value2["States"] as $value5){
		
					
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
					if (strpos($value5["Nickname"],  $prefilter."".$objectname."".$afterfilter) !== false){
						$found = true;
					array_push($cardidarray, array($cardid,$value2["Nickname"],$value2["Description"],$value2["States"]));
					}
					//break;
		
	}
}
				//}	
				}
				if($found)break;
			}
			if(!$found)error_handler("Не найдена карта:~".$objectname."~ в указаных сетах.");			
		}
	}


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
unset($json_a["TabStates"]);
$cardarray = array();
$cardidonlylist = array();
foreach ($cardidarray as $cardval){
	array_push($cardidonlylist,$cardval[0]);
	if(!empty($cardval[3]))
	array_push($cardarray,array('Name' => 'Card','Description' => $cardval[2],'Transform' => array('posX' => 0.831857741,'posY' => 1.86458218,'posZ' => 13.2053528,'rotX' => -0.00358864036,"rotY" => "180.016678",'rotZ' => 359.979523,'scaleX' => 1.0,'scaleY' => 1.0,'scaleZ' => 1.0),"Nickname" => $cardval[1],"CardID" => $cardval[0],"States" => $cardval[3]));
    else
	array_push($cardarray,array('Name' => 'Card','Description' => $cardval[2],'Transform' => array('posX' => 0.831857741,'posY' => 1.86458218,'posZ' => 13.2053528,'rotX' => -0.00358864036,"rotY" => "180.016678",'rotZ' => 359.979523,'scaleX' => 1.0,'scaleY' => 1.0,'scaleZ' => 1.0),"Nickname" => $cardval[1],"CardID" => $cardval[0]));
}
$template = file_get_contents("../datasets/templatesingledeck.json");
$template = json_decode($template, true);	
$template["ObjectStates"][0]["DeckIDs"] = $cardidonlylist;
$template["ObjectStates"][0]["ContainedObjects"] = $cardarray;


$jsonfile = json_encode($template, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES | JSON_PRETTY_PRINT);
$jsonfile = preg_replace('~"CustomDeck": "CDECKREPLACE",~', $complainstring, $jsonfile);
//die();
//$json_a["ObjectStates"][0]["CustomDeck"] = $customdecksoriginal;	
//echo "<pre>".print_r($json_a["ObjectStates"][0]["CustomDeck"],true)."</pre>";
//var_dump($customdecksoriginal);

//die(json_encode($json_a, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES));

//$fp = fopen('output.json', 'w');
//fwrite($fp, $jsonfile);
//fclose($fp);	

//echo "<pre>".print_r($customdeck,true)."</pre>";
//echo "<pre>".print_r($cardidarray,true)."</pre>";
//die();

//header('Content-disposition: attachment; filename=file.json');
//header('Content-type: application/json');
echo($jsonfile);
?>