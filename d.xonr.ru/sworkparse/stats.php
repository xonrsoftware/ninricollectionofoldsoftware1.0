<?php
session_start();
if (!isset($_SESSION["userid"])) {
    header('Location: /sworkparse/auth.php');
    die();
}
include_once "inc/safemysql.class.php";
$db = new SafeMySQL();
$usersdata = $db->getAll("SELECT * FROM users");
?>
<head>
<style>
body{
    margin: 0px !important;
}
.outer {
  display: table;
  position: absolute;
  height: 100%;
  width: 100%;
}

.middle {
  display: table-cell;
  vertical-align: middle;
  text-align: center;
}

.inner {
  margin-left: auto;
  margin-right: auto;
  width: 200px;
}
</style>
</head>
<body>
<div class="outer">
  <div class="middle">
    <div class="inner">
    <img style="width: 100px;" src="/sworkparse/files/xicon.png">
    <div>Осталось обработать:<?php echo($db->getOne("SELECT COUNT(*) FROM modstocheck WHERE checkedby IS NULL")); ?><br></div>
<br>
<?php
foreach($usersdata as $udata){
    echo($udata["namevar"].":". $db->getOne("SELECT COUNT(*) FROM modstocheck WHERE checkedby=?s",$udata["id"])."<br>");
}
?>
    </div>
  </div>
</div>
</body>