<?
include_once("config.php");
include_once("style/header.php");
$error = "";
if($_POST){
	$winnercount = (int)$_POST["gacwinners"];
	$salt = $_POST["gasalt"];
	$hideparts = 0;
	$hidewinners = 0;
	if($_POST["cahidepa"] == "true")
		$hideparts = 1;
	if($_POST["cahidew"] == "true")
		$hidewinners = 1;
	$type = 0;
	if($_POST["gatype"] == "with")$type = 1;
	if($winnercount > 0){
	$text = trim($_POST['gaparticipants']);
$textArTemp = explode(PHP_EOL, $text);
$textAr = array();
foreach($textArTemp as $value){
	$string = trim($value);
	if(!empty($string))
		array_push($textAr,$string);
}
if(count($textAr) > 0){
	if(count($textAr) > 1){
if(!empty($salt)){
$salthash = hash('sha256', $salt);
if($db->getOne('SELECT COUNT(*) FROM giveaways WHERE saltkey = ?s',$salthash) == 0){

if(count($textAr) >= $winnercount){
$bytes = openssl_random_pseudo_bytes(32);
$hash = hash('sha256', bin2hex($bytes)."".$sitesalt);
$date = new DateTime(null, new DateTimeZone('UTC'));
$date->add(new DateInterval('P6M'));
$futuretime = intval($_POST["gastarttimemil"]);
$stringdate = false;
if(!is_numeric($_POST["gastarttimemil"])){
	$stringdate = true;
$futuretime = DateTime::createFromFormat('!m/d/Y H:i:s', $_POST["gastarttimemil"], new DateTimeZone("UTC"));
$futuretime = $futuretime->getTimestamp()*1000;
}
if($stringdate == false || ($stringdate == true && $futuretime > 0)){
//print($futuretime.":".getTimestampMili());
if($futuretime > 0){
if($futuretime > getTimestampMili()){
if($date->getTimestamp()*1000 < $futuretime)$error = "Start time cant be in past";
if(empty($error))
$db->query("INSERT INTO giveaways SET winnerscount=?i,timemilliseconds=?i,type=?i,accesskey=?s,saltkey=?s,hideparts=?i,hidewinners=?i",$winnercount,$futuretime,$type,$hash,$salthash,$hideparts,$hidewinners);
}
	else if(empty($error))
$db->query("INSERT INTO giveaways SET winnerscount=?i,timemilliseconds=?i,type=?i,accesskey=?s,saltkey=?s,hideparts=?i,hidewinners=?i",$winnercount,getTimestampMili(),$type,$hash,$salthash,$hideparts,$hidewinners);
if(empty($error)){
$inseretid = $db->insertId();
$partstring = "";
foreach ($textAr as $line) {
    $db->query("INSERT INTO parts SET string=?s,gaid=?i",trim($line),$inseretid);
	$partstring .=hash('sha256',trim($line));
} 
$db->query("UPDATE giveaways SET part_hash=?s WHERE id=?i",hash('sha256', $partstring),$inseretid);
if(!empty($_POST["gadescr"]) || !empty($_POST["ganame"]))
$db->query("INSERT INTO info SET name=?s,descr=?s,gaid=?i",$_POST["ganame"],strip_tags($_POST["gadescr"]),$inseretid);
}
}else $error = "Start time cant be in past";
}else $error = "Incorrect date format";
}else $error = "Count of winners must be equal or lower than participants";
}else $error = "Not unique giveaway salt";
}else $error = "Giveaway salt cannot be empty";
}else $error = "Cannot create giveaway with only one participant";
}else $error = "Participants list cannot be empty";
}else $error = "Count of winners must be greather than 0";
}
?>
<script>
$( document ).ready(function() {
var channger = $('#gastarttimemil').datetimepicker({
timeFormat: "hh:mm:ss",
timeInput: true,
timezone: '+0000',
showMillisec:false,
showMicrosec:false,
showTimezone:false
});
});
</script>
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
        <label for="gastarttimemil">Giveaway start date (<b>UTC</b>, date pick already in UTC)</label>
      </div>
      <div class="col-75">
        <input type="text" id="gastarttimemil" name="gastarttimemil" placeholder="Select date only if giveaway don't starts now" value="<?=$_POST["gastarttimemil"]?>">
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

  <input id="cahidepa" type="checkbox" name="cahidepa" value="true">
  <label for="cahidepa">Hide participants (Show sha256 hash instead)</label>
  </div>
 <div class="row">
  <input id="cahidew" type="checkbox" name="cahidew" value="true">
  <label for="cahidew">Hide winners (Show sha256 hash instead, not recommended)</label>
    </div>
    <div class="row lastbtn">
      <input type="submit" value="Create">
    </div>
  </form>
</div>
</div>
<?include_once("style/footer.php");?>