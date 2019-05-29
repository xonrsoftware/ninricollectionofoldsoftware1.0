<?php
session_start();
if (!isset($_SESSION["userid"])) {
    header('Location: /sworkparse/auth.php');
    die();
}
include_once "inc/safemysql.class.php";
$db = new SafeMySQL();
$userdata = $db->getRow("SELECT * FROM users WHERE id=?s LIMIT 1",$_SESSION["userid"]);
if($userdata["duserid"] != "466293410848964609")die("Нет.");
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
  width: 700px;
}
</style>
</head>
<body>
<div class="outer">
  <div class="middle">
    <div class="inner">
<?php
foreach($db->getAll("SELECT * FROM modstocheck WHERE languagevar='RU' ORDER BY id") as $item){?>
  <a href="https://steamcommunity.com/sharedfiles/filedetails/?id=<?php echo($item["steamid"]); ?>">https://steamcommunity.com/sharedfiles/filedetails/?id=<?php echo($item["steamid"]); ?></a><br>
<?php }
?>
    </div>
  </div>
</div>
</body>