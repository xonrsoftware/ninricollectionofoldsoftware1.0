<?
include_once("../../private/config.php");
if($_GET["syncode"] == "заменить"){
	if($db->getOne("SELECT COUNT(*) FROM tournamentusers WHERE discoruserid=?i AND tournamentcode=?s",$_POST["discoruserid"],$_GET["tournamentcode"]) == 1){
	$db->query("DELETE FROM tournamentusers WHERE discoruserid=?i AND tournamentcode=?s",$_POST["discoruserid"],$_GET["tournamentcode"]);	
	die("OK");
	}else die("ERRORALREADY");
}else die("ERROR");
?>