<?
include_once("config.php");
$salt = $_GET["salt"];
$parthash = $_GET["parthash"];
if($db->getOne('SELECT COUNT(*) FROM giveaways WHERE saltkey = ?s AND part_hash=?s',$salt,$parthash) == 1){
$gadata = $db->getRow('SELECT * FROM giveaways WHERE saltkey = ?s AND part_hash=?s',$salt,$parthash);
$partarray = $db->getAll('SELECT * FROM parts WHERE gaid = ?i',$gadata["id"]);
$allowtoedit = false;
$archivedata = 0;
if(intval($gadata["timeclosetimestamp"]) > 0){
$archivedata = new DateTime(null, new DateTimeZone('UTC'));
$archivedata->setTimestamp($gadata["timeclosetimestamp"]);
$archivedata->add(new DateInterval('P1D'));
//$archivedata = ;
}

$currentutctimestamp = new DateTime(null, new DateTimeZone('UTC'));
if($_POST){
if(!empty($_POST["accesskey"])){
	echo("SET KEY");
	$_SESSION["ga".$gadata["id"]."accesskey"] = $_POST["accesskey"];
}
}
if(!empty($_SESSION["ga".$gadata["id"]."accesskey"])){
	if($gadata["status"] != 3 && ($archivedata == 0 || $currentutctimestamp->getTimestamp() < $archivedata->getTimestamp())){
	if($db->getOne('SELECT COUNT(*) FROM giveaways WHERE saltkey = ?s AND part_hash=?s AND accesskey=?s',$salt,$parthash,$_SESSION["ga".$gadata["id"]."accesskey"]) == 1){
		$allowtoedit = true;
	}
	}
}
if($_POST){
if(!empty($_POST["countofwinners"]) && $allowtoedit){
	$countofwinners = (int)$_POST["countofwinners"];
	if($countofwinners <= 0 || $countofwinners > count($partarray))die("Incorrect new count of winners");
	$db->query("UPDATE giveaways SET winnerscount=?i WHERE id=?i",$countofwinners,$gadata["id"]);
	if($db->getOne('SELECT COUNT(*) FROM info WHERE gaid = ?i',$gadata["id"]) == 1){
		$db->query("UPDATE info SET name=?s,descr=?s WHERE gaid=?i",$_POST["name"],strip_tags($_POST["description"]),$gadata["id"]);
	}else{
		$db->query("INSERT INTO info SET name=?s,descr=?s,gaid=?i",$_POST["name"],strip_tags($_POST["description"]),$gadata["id"]);
	}
	$gadata = $db->getRow('SELECT * FROM giveaways WHERE saltkey = ?s AND part_hash=?s',$salt,$parthash);
}
}
$gainfo = array();
if($db->getOne('SELECT COUNT(*) FROM info WHERE gaid = ?i',$gadata["id"]) == 1)
	$gainfo = $db->getRow('SELECT * FROM info WHERE gaid = ?i',$gadata["id"]);
//die(print_r($gainfo));


//echo($_SESSION["ga".$gadata["id"]."accesskey"]);
//die("fFff".(int)$allowtoedit);
?>
<?if(!$allowtoedit){?>
<form method="post">
   <p>Access key: <input type="text" name="accesskey" /></p>
   <input type="submit" name="submit" value="Submit" />
</form>
<?}else{if($_POST["action"] == "showkey")echo("Access key:".$_SESSION["ga".$gadata["id"]."accesskey"]."<br>");else{?>
<form method="post">
   <input type="hidden" name="action" value="showkey" /></p>
   <input type="submit" name="submit" value="Show access key" />
</form>
<?}
?>
<form method="post">
<?
}?>
Salt hash:<?=$gadata["saltkey"]?><br>
Count of winners:<?if($allowtoedit){?><input type="text" name="countofwinners" value="<?=$gadata["winnerscount"]?>" /><?}else{?><?=$gadata["winnerscount"]?><?}?><br>
Particans hash:<?=$gadata["part_hash"]?><br>
Block hash:<?=$gadata["block_hash"]?><br>
Block merkel root:<?=$gadata["block_merkel"]?><br>
Create time in milliseconds (UTC):<?=$gadata["timemilliseconds"]?><br>
Create time dd/MM/yyyy hh:mm:ss (UTC):<?=gmdate("d/m/Y H:i:s", $gadata["timemilliseconds"]/1000)?><br>
Close time in unix timestamp (UTC):<?=$gadata["timeclosetimestamp"]?><br>
Close time dd/MM/yyyy hh:mm:ss (UTC):<?=gmdate("d/m/Y H:i:s", intval($gadata["timeclosetimestamp"]))?><br>
Giveawaytype:<?if($gadata["type"] == 1)echo"Generate WITH possibility of multi win";else echo "Generate without possibility of multi win";?><br>
Status:<?if($gadata["status"] == 0)echo"Waiting for block";elseif($gadata["status"] == 1){ 
$interval = $currentutctimestamp->diff($archivedata);
echo "Completed (Time until archivation: ".$interval->format('%Y years %m months %d days %H hours %i minutes %s seconds').")";
}elseif($gadata["status"] == 2) echo "Error";elseif($gadata["status"] == 3) echo "Archived";elseif($gadata["status"] == 4) echo "Preregister";?><br>
<?if(count($gainfo) > 0 || $allowtoedit){?>
<?if(!empty($gainfo["name"]) || $allowtoedit){if($allowtoedit){
?>
Giveaway name:<input type="text" name="name" value="<?=$gainfo["name"]?>" />
<?	
}else{?>
Giveaway name:<?=$gainfo["name"]?>
<?}}?><br>
<?if(!empty($gainfo["descr"]) || $allowtoedit){include_once("bbcode.php");?>Giveaway description: (BBCode support)<br>
<?$bbcode = new BBCode;
if($allowtoedit){
?>
<textarea name="description" style="width:100%;height:100%;">
<?=$gainfo["descr"]?>
</textarea>
<?	
}
else
echo($bbcode->toHTML($gainfo["descr"])."<br>");?>
<?}}?>
Particans:<br>
<textarea style="width:100%;height:100%;"><?
foreach($partarray as $value){
	if($gadata["hideparts"] == 1 && !$allowtoedit)
		echo(hash('sha256',$value["string"])."".PHP_EOL);
		else
	echo($value["string"]."".PHP_EOL);
}
?></textarea><br>
Winners:<br>
<textarea style="width:100%;height:100%;"><?
if($gadata["type"] == 1){
foreach($db->getAll('SELECT * FROM winners WHERE gaid = ?i AND type=?i LIMIT ?i',$gadata["id"],$gadata["type"],$gadata["winnerscount"]) as $value){

	if($gadata["hidewinners"] == 1 && !$allowtoedit)
		echo(hash('sha256',$partarray[$value["partid"]]["string"])."".PHP_EOL);
		else
	echo($partarray[$value["partid"]]["string"]."".PHP_EOL);
}
}else{
	$settledarray = $partarray;
foreach($db->getAll('SELECT * FROM winners WHERE gaid = ?i AND type=?i LIMIT ?i',$gadata["id"],$gadata["type"],$gadata["winnerscount"]) as $value){

	if($gadata["hidewinners"] == 1 && !$allowtoedit)
		echo(hash('sha256',$settledarray[$value["partid"]]["string"])."".PHP_EOL);
		else
	echo($settledarray[$value["partid"]]["string"]."".PHP_EOL);
array_splice($settledarray, $value["partid"], 1);
}
}
?></textarea><br>
<?
if($allowtoedit){?>
	   <input type="submit" name="submit" value="Save" />
</form>
<?}//NEW?>
<div class="bodycontainer">
<div class="internal">
<form method="post">
<? if(!empty($error)){?>
<div class="row">
<br>
<div class="alert">
  <span class="closebtn" onclick="this.parentElement.style.display='none';">&times;</span> 
<?=$error?>
</div>
</div>
<?}?>
    <div class="row">
      <div class="col-25">
        <label for="ganame">Giveaway name</label>
      </div>
      <div class="col-75">
        <input type="text" id="ganame" name="ganame" placeholder="Can be empty" value="<?=$_POST["ganame"]?>">
      </div>
    </div>
	<div class="row">
      <div class="col-25">
        <label for="gatype">Giveaway type</label>
      </div>
      <div class="col-75">
        <select id="gatype" name="gatype">
          <option value="without" <?if($_POST["gatype"] == "without")echo("checked");?>>Without possibility of same participant winning multiple times</option>
          <option value="with" <?if($_POST["gatype"] == "with")echo("checked");?>>WITH possibility of same participant winning multiple times</option>
        </select>
      </div>
    </div>
	    <div class="row">
      <div class="col-25">
        <label for="gastarttimemil">Giveaway start date (<b>UTC</b>, Date pick already in UTC)</label>
      </div>
      <div class="col-75">
        <input type="text" id="gastarttimemil" name="gastarttimemil" placeholder="Select date only if giveaway don't start now" value="<?=$_POST["gastarttimemil"]?>">
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="gasalt">Giveaway salt (Must be unique)</label>
      </div>
      <div class="col-75">
        <input type="text" id="gasalt" name="gasalt" value="<?=$_POST["gasalt"]?>">
      </div>
    </div>
	    <div class="row">
      <div class="col-25">
        <label for="gadescr">Giveaway description</label>
      </div>
      <div class="col-75">
        <textarea id="gadescr" name="gadescr" placeholder="Can be empty" style="height:200px" value="<?=$_POST["gadescr"]?>"></textarea>
      </div>
    </div>
	    <div class="row">
      <div class="col-25">
        <label for="fname">Count of winners</label>
      </div>
      <div class="col-75">
        <input type="text" id="fname" name="gacwinners" value="<?if(empty($_POST["gacwinners"]))echo("1");else echo($_POST["gacwinners"]);?>">
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="gaparticipants">Participants list (Participant per line)</label>
      </div>
      <div class="col-75">
        <textarea id="gaparticipants" name="gaparticipants" style="height:200px"><?=$_POST["gaparticipants"]?></textarea>
      </div>
    </div>
	    <div class="row">
      <div class="col-25">
        <label for="gawinners">Winners</label>
      </div>
      <div class="col-75">
        <textarea id="gawinners" name="gawinners" style="height:200px"><?
if($gadata["type"] == 1){
foreach($db->getAll('SELECT * FROM winners WHERE gaid = ?i AND type=?i LIMIT ?i',$gadata["id"],$gadata["type"],$gadata["winnerscount"]) as $value){

	if($gadata["hidewinners"] == 1 && !$allowtoedit)
		echo(hash('sha256',$partarray[$value["partid"]]["string"])."".PHP_EOL);
		else
	echo($partarray[$value["partid"]]["string"]."".PHP_EOL);
}
}else{
	$settledarray = $partarray;
foreach($db->getAll('SELECT * FROM winners WHERE gaid = ?i AND type=?i LIMIT ?i',$gadata["id"],$gadata["type"],$gadata["winnerscount"]) as $value){

	if($gadata["hidewinners"] == 1 && !$allowtoedit)
		echo(hash('sha256',$settledarray[$value["partid"]]["string"])."".PHP_EOL);
		else
	echo($settledarray[$value["partid"]]["string"]."".PHP_EOL);
array_splice($settledarray, $value["partid"], 1);
}
}
?></textarea>
      </div>
    </div>
	    <div class="row">

  <input id="cahidepa" type="checkbox" name="cahidepa" value="true">
  <label for="cahidepa">Hide participants (Show sha256 hash instead)</label>
  </div>
 <div class="row">
  <input id="cahidew" type="checkbox" name="cahidew" value="true">
  <label for="cahidew">Hide winners (Show sha256 hash instead, not recommended)</label>
    </div>
    <div class="row lastbtn">
	<?
if($allowtoedit){?>
      <input type="submit" value="Create"><?}?>
    </div>
  </form>
</div>
</div>
<?
}else{
	die("NOT FOUND");
}
?>