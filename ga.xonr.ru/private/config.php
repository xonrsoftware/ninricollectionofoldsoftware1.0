<?
session_start();
//Load composer's autoloader
require 'vendor/autoload.php';
include_once("safemysql.class.php");
$db = new SafeMySQL(array(
	'user'    => 'заменить',
	'pass'    => 'заменить',
	'db'      => 'заменить'
));
$sitesalt = "заменить";
$emailverifysalt = "заменить";
$passwordusersalt = "заменить";
function getTimestampMili(){
    $seconds = microtime(true); // true = float, false = weirdo "0.2342 123456" format 
    return round( ($seconds * 1000) );
}
function isValidEmail($email){ 
    return filter_var($email, FILTER_VALIDATE_EMAIL) !== false;
}
?>