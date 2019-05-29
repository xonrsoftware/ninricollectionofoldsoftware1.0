<?
include_once("../../private/config.php");
if($_GET["syncode"] == "заменить"){
	if($db->getOne("SELECT COUNT(*) FROM tournamentusers WHERE discoruserid=?i AND tournamentcode=?s",$_POST["discoruserid"],$_GET["tournamentcode"]) == 0){
	$db->query("INSERT INTO tournamentusers SET discoruserid=?i,tournamentcode=?s,timestamp=?i",$_POST["discoruserid"],$_GET["tournamentcode"],time());	
	die("OK");
	}else die("ERRORALREADY");
}else die("ERROR");
?>