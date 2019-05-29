<?php
session_start();
error_reporting(E_ERROR);
if (!isset($_SESSION["userid"])) {
    header('Location: /sworkparse/auth.php');
    die();
}
include_once "inc/safemysql.class.php";
$db = new SafeMySQL();
$userdata = $db->getRow("SELECT * FROM users WHERE id=?s LIMIT 1",$_SESSION["userid"]);
//if($userdata["duserid"] != "466293410848964609")die("Пожалуйста подождите, происходит обновление скрипта. **Музыка элеватора**");
if($_POST && $userdata["currentactive"] != null)
$item = $db->getRow("SELECT * FROM modstocheck WHERE id=?i",$userdata["currentactive"]);
else
$item = $db->getRow("SELECT * FROM modstocheck WHERE checkedby IS NULL ORDER BY lastviewed ASC, containsrussian DESC LIMIT 1");
if($item == null){
  die("Не найдено не обработанных публикаций в мастерской.<br><a href='/sworkparse/start.php'>Попробовать ещё раз?</a>");
}
$bgglink = "";
$teseralink = "";
if($item["gameid"] != null){
	$gameinforr = $db->getRow("SELECT * FROM games WHERE id=?i",$item["gameid"]);
	if(!empty($gameinforr["bggid"]))$bgglink = "https://boardgamegeek.com/boardgame/".$gameinforr["bggid"]."/";
	if(!empty($gameinforr["teseraid"]))$teseralink = "https://tesera.ru/game/".$gameinforr["teseraid"]."/";
}
if($item["checkedby"] != null)die("Кто-то успел обработать эту публикацию раньше.<br><a href='/sworkparse/start.php'>Найти другую?</a>");
$datetime = new DateTime("now", new DateTimeZone("UTC"));
$db->query("UPDATE modstocheck SET lastviewed=?i WHERE id=?i",$datetime->getTimestamp(),$item["id"]);
$db->query("UPDATE users SET currentactive=?i WHERE id=?i",$item["id"],$userdata["id"]);
$allowedlang = array(
  "AF",
  "SQ",
  "AR",
  "HY",
  "EU",
  "BN",
  "BG",
  "CA",
  "KM",
  "ZH",
  "HR",
  "CS",
  "DA",
  "NL",
  "EN",
  "ET",
  "FJ",
  "FI",
  "FR",
  "KA",
  "DE",
  "EL",
  "GU",
  "HE",
  "HI",
  "HU",
  "IS",
  "ID",
  "GA",
  "IT",
  "JA",
  "JW",
  "KO",
  "LA",
  "LV",
  "LT",
  "MK",
  "MS",
  "ML",
  "MT",
  "MI",
  "MR",
  "MN",
  "NE",
  "NO",
  "FA",
  "PL",
  "PT",
  "PA",
  "QU",
  "RO",
  "RU",
  "SM",
  "SR",
  "SK",
  "SL",
  "ES",
  "SW",
  "SV",
  "TA",
  "TT",
  "TE",
  "TH",
  "BO",
  "TO",
  "TR",
  "UK",
  "UR",
  "UZ",
  "VI",
  "CY",
  "XH",
  "EKK"
);
//print_r($_POST);
if($_POST){
  if($_POST["gametype"] > 0){
   // if(in_array($_POST["lang"], $allowedlang) && in_array($_POST["lang2"], $allowedlang)){
    if($_POST["gametype"] < 3){
		if(!in_array($_POST["lang"], $allowedlang))die("Не выбран язык.");
    $teseraid = "";
    $bggid = "";
    if(!empty($_POST["teseralink"])){
      $parts = parse_url($_POST["teseralink"]);
      $path_components = explode( '/', $parts['path'] );
      //var_dump($path_components);
      $teseraid = trim($path_components[2]);
    }
    if(!empty($_POST["bgglink"])){
      $parts = parse_url($_POST["bgglink"]);
      $path_components = explode( '/', $parts['path'] );
     // print_r($path_components);
      $bggid = trim($path_components[2]);
    }
    $gameid = 0;
    if(!empty($bggid)){
      $teseratry = $db->getOne("SELECT id FROM games WHERE bggid=?s LIMIT 1",$bggid);
      if($teseratry != null && $teseratry > 0)
      $gameid = $teseratry;
    }
    if($gameid == 0 && !empty($teseraid)){
    $teseratry = $db->getOne("SELECT id FROM games WHERE teseraid=?s LIMIT 1",$teseraid);
    if($teseratry != null && $teseratry > 0)
    $gameid = $teseratry;
    }
    if($gameid == 0 && (!empty($bggid) || !empty($teseraid))){
      $db->query("INSERT INTO games SET teseraid=?s,bggid=?s",$teseraid,$bggid);
      $gameid = $db->insertId();
    }elseif($gameid == 0) $gameid = null;
  //die("GAMMMMEID:".$gameid);
    if($_POST["gametype"] == 1)
    $db->query("UPDATE modstocheck SET checkedby=?i,gameid=?i,languagevar=?s,descriptionvar=?s,statusvar=0,is_roleplaygame=1,sortid=?i,otherlink=?s WHERE id=?i",$userdata["id"],$gameid,$_POST["lang"],$_POST["description"],$db->getOne("SELECT COUNT(*) FROM modstocheck WHERE gameid=?s",$gameid),$_POST["otherlink"],$item["id"]);
    elseif($_POST["gametype"] == 2)
    $db->query("UPDATE modstocheck SET checkedby=?i,gameid=?i,languagevar=?s,descriptionvar=?s,statusvar=0,is_tabletopgame=1,sortid=?i,otherlink=?s WHERE id=?i",$userdata["id"],$gameid,$_POST["lang"],$_POST["description"],$db->getOne("SELECT COUNT(*) FROM modstocheck WHERE gameid=?s",$gameid),$_POST["otherlink"],$item["id"]);
    elseif($_POST["gametype"] == 3)
    $db->query("UPDATE modstocheck SET checkedby=?i,gameid=?i,languagevar=?s,descriptionvar=?s,statusvar=0,is_customgame=1,sortid=?i,otherlink=?s WHERE id=?i",$userdata["id"],$gameid,$_POST["lang"],$_POST["description"],$db->getOne("SELECT COUNT(*) FROM modstocheck WHERE gameid=?s",$gameid),$_POST["otherlink"],$item["id"]);
  //}else die("Запрещено добавление без тесеры или бгг.");
    
  }elseif($_POST["gametype"] == 3){
	  if(!in_array($_POST["lang"], $allowedlang))die("Не выбран язык.");
    $teseraid = "";
    $bggid = "";
    if(!empty($_POST["teseralink"])){
      $parts = parse_url($_POST["teseralink"]);
      $path_components = explode( '/', $parts['path'] );
      //var_dump($path_components);
      $teseraid = trim($path_components[2]);
    }
    if(!empty($_POST["bgglink"])){
      $parts = parse_url($_POST["bgglink"]);
      $path_components = explode( '/', $parts['path'] );
     // print_r($path_components);
      $bggid = trim($path_components[2]);
    }
    $gameid = 0;
    if(!empty($bggid)){
      $teseratry = $db->getOne("SELECT id FROM games WHERE bggid=?s LIMIT 1",$bggid);
      if($teseratry != null && $teseratry > 0)
      $gameid = $teseratry;
    }
    if($gameid == 0 && !empty($teseraid)){
    $teseratry = $db->getOne("SELECT id FROM games WHERE teseraid=?s LIMIT 1",$teseraid);
    if($teseratry != null && $teseratry > 0)
    $gameid = $teseratry;
    }
   // if((!empty($bggid) || !empty($teseraid)){
    if($gameid == 0 && (!empty($bggid) || !empty($teseraid))){
      $db->query("INSERT INTO games SET teseraid=?s,bggid=?s",$teseraid,$bggid);
      $gameid = $db->insertId();
    }elseif($gameid == 0) $gameid = null;
  //die("GAMMMMEID:".$gameid);
    if($_POST["gametype"] == 1)
    $db->query("UPDATE modstocheck SET checkedby=?i,gameid=?i,languagevar=?s,descriptionvar=?s,statusvar=0,is_roleplaygame=1,sortid=?i,otherlink=?s WHERE id=?i",$userdata["id"],$gameid,$_POST["lang"],$_POST["description"],$db->getOne("SELECT COUNT(*) FROM modstocheck WHERE gameid=?s",$gameid),$_POST["otherlink"],$item["id"]);
    elseif($_POST["gametype"] == 2)
    $db->query("UPDATE modstocheck SET checkedby=?i,gameid=?i,languagevar=?s,descriptionvar=?s,statusvar=0,is_tabletopgame=1,sortid=?i,otherlink=?s WHERE id=?i",$userdata["id"],$gameid,$_POST["lang"],$_POST["description"],$db->getOne("SELECT COUNT(*) FROM modstocheck WHERE gameid=?s",$gameid),$_POST["otherlink"],$item["id"]);
    elseif($_POST["gametype"] == 3)
    $db->query("UPDATE modstocheck SET checkedby=?i,gameid=?i,languagevar=?s,descriptionvar=?s,statusvar=0,is_customgame=1,sortid=?i,otherlink=?s WHERE id=?i",$userdata["id"],$gameid,$_POST["lang"],$_POST["description"],$db->getOne("SELECT COUNT(*) FROM modstocheck WHERE gameid=?s",$gameid),$_POST["otherlink"],$item["id"]);
 // }else die("Запрещено добавление без тесеры или бгг.");
    
  }elseif($_POST["gametype"] == 4){
	  if(!in_array($_POST["lang2"], $allowedlang))die("Не выбран язык.");
    $teseraid = "";
    $bggid = "";
    if(!empty($_POST["teseralink2"])){
      $parts = parse_url($_POST["teseralink2"]);
      $path_components = explode( '/', $parts['path'] );
      //var_dump($path_components);
      $teseraid = trim($path_components[2]);
    }
    if(!empty($_POST["bgglink2"])){
      $parts = parse_url($_POST["bgglink2"]);
      $path_components = explode( '/', $parts['path'] );
     // print_r($path_components);
      $bggid = trim($path_components[2]);
    }
    $gameid = 0;
    if(!empty($bggid)){
      $teseratry = $db->getOne("SELECT id FROM games WHERE bggid=?s LIMIT 1",$bggid);
      if($teseratry != null && $teseratry > 0)
      $gameid = $teseratry;
    }
    if($gameid == 0 && !empty($teseraid)){
    $teseratry = $db->getOne("SELECT id FROM games WHERE teseraid=?s LIMIT 1",$teseraid);
    if($teseratry != null && $teseratry > 0)
    $gameid = $teseratry;
    }
   // if((!empty($bggid) || !empty($teseraid)){
    if($gameid == 0 && (!empty($bggid) || !empty($teseraid))){
      $db->query("INSERT INTO games SET teseraid=?s,bggid=?s",$teseraid,$bggid);
      $gameid = $db->insertId();
    }elseif($gameid == 0) $gameid = null;
 /*   if($gameid!=null)$sortid = $db->getOne("SELECT COUNT(*) FROM modstocheck WHERE gameid=?s",$gameid);
    else $sortid = null;*/
    if(isset($_POST["is_item"]))
    $db->query("UPDATE modstocheck SET checkedby=?s,languagevar=?s,descriptionvar=?s,statusvar=0,is_item=1,gameid=?i,sortid=?i,otherlink=?s WHERE id=?i",$userdata["id"],$_POST["lang2"],$_POST["description2"],$gameid,$db->getOne("SELECT COUNT(*) FROM modstocheck WHERE gameid=?s",$gameid),$_POST["otherlink2"],$item["id"]);
    if(isset($_POST["is_instrument"]))
    $db->query("UPDATE modstocheck SET checkedby=?s,languagevar=?s,descriptionvar=?s,statusvar=0,is_instrument=1,gameid=?i,sortid=?i,otherlink=?s WHERE id=?i",$userdata["id"],$_POST["lang2"],$_POST["description2"],$gameid,$db->getOne("SELECT COUNT(*) FROM modstocheck WHERE gameid=?s",$gameid),$_POST["otherlink2"],$item["id"]);
    if(isset($_POST["is_other"]))
    $db->query("UPDATE modstocheck SET checkedby=?s,languagevar=?s,descriptionvar=?s,statusvar=0,is_other=1,gameid=?i,sortid=?i,otherlink=?s WHERE id=?i",$userdata["id"],$_POST["lang2"],$_POST["description2"],$gameid,$db->getOne("SELECT COUNT(*) FROM modstocheck WHERE gameid=?s",$gameid),$_POST["otherlink2"],$item["id"]);

  }elseif($_POST["gametype"] == 5){
    $db->query("UPDATE modstocheck SET checkedby=?s,statusvar=2 WHERE id=?i",$userdata["id"],$item["id"]);
  }else die("Ошибка выбора типа игры.");
  //}else die("Не выбран язык.");
}
}
if($userdata["currentactive"] == $item["id"]){
  header('Location: /sworkparse/start.php');
  die();
}
?>

  <head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
  </head>

  <body>
    <div style="background-color: #4e1777;padding: 20px;width: 55%;color: #fff; text-align: center; margin: 0 auto;">
      <div id="userpanel" style="
    float: left;
    text-align: left;
    /* margin-right: 200px; */
">
        Вы вошли как:
        <br>
        <?php echo($userdata["namevar"]); ?>
        <br>
        <?php echo($userdata["duserid"]); ?><br>
        <a href="logout.php">Выйти</a>
      </div>
      <div id="searchdiv" style="
      /* float: right; */
    text-align: right;
    /* margin-right: 200px; */
"><a target="_blank" href="https://steamcommunity.com/sharedfiles/filedetails/?id=<?php echo($item["steamid"]); ?>">Открыть мод в новом окне (для установки)</a>
        <br>
        <a target="_blank" href="https://tesera.ru/search/?q=<?php echo($item["namevar"]); ?>">Поиск по названию на tesera</a>
        <br>
        <a target="_blank" href="https://boardgamegeek.com/geeksearch.php?action=search&amp;objecttype=boardgame&amp;q=<?php echo($item["namevar"]); ?>">Поиск по названию на bgg</a>
      </div><br>
      <form method="post">
      <div id="isitgame" >
        Это игра?

        <br> <br>
        <input type="radio" class="gameinfoopen" id="gametype" name="gametype" value="1">
        <label for="gametype">Ролевая игра</label>
        <input type="radio" class="gameinfoopen" id="gametype1" name="gametype" value="2">
        <label for="gametype1">Настольная игра</label>
        <input type="radio" class="gameinfoopen" id="gametype2" name="gametype" value="3">
        <label for="gametype2">Пользовательская игра</label>
        <input type="radio" class="notgameradio" id="gametype3" name="gametype" value="4">
        <label for="gametype3">Нет</label>
        <input type="radio" class="deletedgame" id="gametype4" name="gametype" value="5">
        <label for="gametype4">Удалён из мастерской</label>
        <br><br>
        
      </div>
      <div id="gameinfo" style="display:none;">
        Укажите дополнительную информацию:
        <br><br>
        <label for="lang">Выберите язык:</label>
        <select id="lang" name="lang">
		<option value="ENNS">Не выбран</option>
        <option value="EKK">Не зависит от языка</option>
        <option value="RU">Russian</option>
        <option value="EN">English</option>
          <option value="AF">Afrikanns</option>
          <option value="SQ">Albanian</option>
          <option value="AR">Arabic</option>
          <option value="HY">Armenian</option>
          <option value="EU">Basque</option>
          <option value="BN">Bengali</option>
          <option value="BG">Bulgarian</option>
          <option value="CA">Catalan</option>
          <option value="KM">Cambodian</option>
          <option value="ZH">Chinese (Mandarin)</option>
          <option value="HR">Croation</option>
          <option value="CS">Czech</option>
          <option value="DA">Danish</option>
          <option value="NL">Dutch</option>
          <option value="ET">Estonian</option>
          <option value="FJ">Fiji</option>
          <option value="FI">Finnish</option>
          <option value="FR">French</option>
          <option value="KA">Georgian</option>
          <option value="DE">German</option>
          <option value="EL">Greek</option>
          <option value="GU">Gujarati</option>
          <option value="HE">Hebrew</option>
          <option value="HI">Hindi</option>
          <option value="HU">Hungarian</option>
          <option value="IS">Icelandic</option>
          <option value="ID">Indonesian</option>
          <option value="GA">Irish</option>
          <option value="IT">Italian</option>
          <option value="JA">Japanese</option>
          <option value="JW">Javanese</option>
          <option value="KO">Korean</option>
          <option value="LA">Latin</option>
          <option value="LV">Latvian</option>
          <option value="LT">Lithuanian</option>
          <option value="MK">Macedonian</option>
          <option value="MS">Malay</option>
          <option value="ML">Malayalam</option>
          <option value="MT">Maltese</option>
          <option value="MI">Maori</option>
          <option value="MR">Marathi</option>
          <option value="MN">Mongolian</option>
          <option value="NE">Nepali</option>
          <option value="NO">Norwegian</option>
          <option value="FA">Persian</option>
          <option value="PL">Polish</option>
          <option value="PT">Portuguese</option>
          <option value="PA">Punjabi</option>
          <option value="QU">Quechua</option>
          <option value="RO">Romanian</option>
          <option value="SM">Samoan</option>
          <option value="SR">Serbian</option>
          <option value="SK">Slovak</option>
          <option value="SL">Slovenian</option>
          <option value="ES">Spanish</option>
          <option value="SW">Swahili</option>
          <option value="SV">Swedish </option>
          <option value="TA">Tamil</option>
          <option value="TT">Tatar</option>
          <option value="TE">Telugu</option>
          <option value="TH">Thai</option>
          <option value="BO">Tibetan</option>
          <option value="TO">Tonga</option>
          <option value="TR">Turkish</option>
          <option value="UK">Ukranian</option>
          <option value="UR">Urdu</option>
          <option value="UZ">Uzbek</option>
          <option value="VI">Vietnamese</option>
          <option value="CY">Welsh</option>
          <option value="XH">Xhosa</option>
        </select>
        <br> <br>
        <label for="teseralink">Ссылка на игру на тесера:</label>
        <input type="text" style="width: 100%;" id="teseralink" value="<?php echo($teseralink); ?>" name="teseralink" />
        <br> <br>
        <label for="bgglink">Ссылка на игру на бгг:</label>
        <input type="text" style="width: 100%;" id="bgglink" value="<?php echo($bgglink); ?>" name="bgglink" />
        <br> <br>
		        <label for="otherlink">Другая ссылка:</label>
        <input type="text" style="width: 100%;" id="otherlink" value="<?php echo($item["otherlink"]); ?>" name="otherlink" />
        <br> <br>
        <label for="description">Краткое описание к моду (не игре), в одну строку:</label>
        <input type="text" style="width: 100%;" id="description" value="<?php echo($item["descriptionvar"]); ?>" name="description" />
        <br> <br>
        <button type="submit">Сохранить</button>
      </div>
      <div id="deletedgame" style="display:none;">
      <button type="submit">Сохранить</button>
      </div>
      <div id="notgame" style="display:none;">
        Какой тип?
        <br><br>
        <label for="lang2">Выберите язык:</label>
        <select id="lang2" name="lang2">
		<option value="ENNS">Не выбран</option>
        <option value="EKK">Не зависит от языка</option>
        <option value="RU">Russian</option>
        <option value="EN">English</option>
          <option value="AF">Afrikanns</option>
          <option value="SQ">Albanian</option>
          <option value="AR">Arabic</option>
          <option value="HY">Armenian</option>
          <option value="EU">Basque</option>
          <option value="BN">Bengali</option>
          <option value="BG">Bulgarian</option>
          <option value="CA">Catalan</option>
          <option value="KM">Cambodian</option>
          <option value="ZH">Chinese (Mandarin)</option>
          <option value="HR">Croation</option>
          <option value="CS">Czech</option>
          <option value="DA">Danish</option>
          <option value="NL">Dutch</option>
          <option value="ET">Estonian</option>
          <option value="FJ">Fiji</option>
          <option value="FI">Finnish</option>
          <option value="FR">French</option>
          <option value="KA">Georgian</option>
          <option value="DE">German</option>
          <option value="EL">Greek</option>
          <option value="GU">Gujarati</option>
          <option value="HE">Hebrew</option>
          <option value="HI">Hindi</option>
          <option value="HU">Hungarian</option>
          <option value="IS">Icelandic</option>
          <option value="ID">Indonesian</option>
          <option value="GA">Irish</option>
          <option value="IT">Italian</option>
          <option value="JA">Japanese</option>
          <option value="JW">Javanese</option>
          <option value="KO">Korean</option>
          <option value="LA">Latin</option>
          <option value="LV">Latvian</option>
          <option value="LT">Lithuanian</option>
          <option value="MK">Macedonian</option>
          <option value="MS">Malay</option>
          <option value="ML">Malayalam</option>
          <option value="MT">Maltese</option>
          <option value="MI">Maori</option>
          <option value="MR">Marathi</option>
          <option value="MN">Mongolian</option>
          <option value="NE">Nepali</option>
          <option value="NO">Norwegian</option>
          <option value="FA">Persian</option>
          <option value="PL">Polish</option>
          <option value="PT">Portuguese</option>
          <option value="PA">Punjabi</option>
          <option value="QU">Quechua</option>
          <option value="RO">Romanian</option>
          <option value="SM">Samoan</option>
          <option value="SR">Serbian</option>
          <option value="SK">Slovak</option>
          <option value="SL">Slovenian</option>
          <option value="ES">Spanish</option>
          <option value="SW">Swahili</option>
          <option value="SV">Swedish </option>
          <option value="TA">Tamil</option>
          <option value="TT">Tatar</option>
          <option value="TE">Telugu</option>
          <option value="TH">Thai</option>
          <option value="BO">Tibetan</option>
          <option value="TO">Tonga</option>
          <option value="TR">Turkish</option>
          <option value="UK">Ukranian</option>
          <option value="UR">Urdu</option>
          <option value="UZ">Uzbek</option>
          <option value="VI">Vietnamese</option>
          <option value="CY">Welsh</option>
          <option value="XH">Xhosa</option>
        </select>
        <br><br>
        <input type="checkbox" id="modtype" name="is_item" value="<?php echo($item["is_item"]); ?>">
        <label for="modtype">Предмет</label>
        <input type="checkbox" id="modtype2" name="is_instrument" value="<?php echo($item["is_instrument"]); ?>">
        <label for="modtype2">Инструмент</label>
        <input type="checkbox" id="modtype3" name="is_other" value="<?php echo($item["is_other"]); ?>">
        <label for="modtype3">Другое</label><br><br>
        <br> <br>
        <label for="teseralink2">Ссылка на игру на тесера (Если относится к игре):</label>
        <input type="text" value="<?php echo($teseralink); ?>" style="width: 100%;" id="teseralink2" name="teseralink2" />
        <br> <br>
        <label for="bgglink2">Ссылка на игру на бгг (Если относится к игре):</label>
        <input type="text" value="<?php echo($bgglink); ?>" style="width: 100%;" id="bgglink2" name="bgglink2" />
        <br> <br>
				        <label for="otherlink2">Другая ссылка:</label>
        <input type="text" style="width: 100%;" id="otherlink2" value="<?php echo($item["otherlink"]); ?>" name="otherlink2" />
        <br> <br>
        <label for="description2">Краткое описание к моду (не игре), в одну строку:</label>
        <input type="text" value="<?php echo($item["descriptionvar"]); ?>" style="width: 100%;" id="description2" name="description2" />
        <br> <br>
        <button type="submit">Сохранить</button>
      </div>
      </form>
    </div>
    <?php
echo (file_get_contents("https://steamcommunity.com/sharedfiles/filedetails/?id=" . $item['steamid'] . "&l=russian"));
?>
      </div>
  </body>
  <script>
  jQuery(document).ready(function() {
    jQuery(document).on("change", ".gameinfoopen", function(e){
  jQuery("#notgame").hide();
  jQuery("#deletedgame").hide();
  jQuery("#gameinfo").show();
});
jQuery(document).on("change", ".notgameradio", function(e){
  jQuery("#gameinfo").hide();
  jQuery("#deletedgame").hide();
  jQuery("#notgame").show();
});
jQuery(document).on("change", ".deletedgame", function(e){
  jQuery("#gameinfo").hide();
  jQuery("#deletedgame").show();
  jQuery("#notgame").hide();
});
});
    </script>