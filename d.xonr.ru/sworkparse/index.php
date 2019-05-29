<?php
session_start();
/*if(!isset($_SESSION["userid"])){
    header('Location: /sworkparse/auth.php');
    die();
}*/
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
<br>
<?php
if(!isset($_SESSION["userid"])){
    ?>
    <a href="/sworkparse/auth.php">Войти через Discord</a>
    <?php
}else{
?>
<a href="/sworkparse/start.php">Приступить</a><br><br>
<a href="/sworkparse/logout.php">Выйти из аккаунта</a>
<?php
}
?>
    </div>
  </div>
</div>
</body>