<?php
session_start();
session_unset();
session_destroy();

header("location:/sworkparse/index.php");
exit();
?>