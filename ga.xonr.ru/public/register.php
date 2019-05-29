<?
include_once($_SERVER['DOCUMENT_ROOT']."/config.php");
include_once($_SERVER['DOCUMENT_ROOT']."/style/header.php");
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
$error = "";
if($_POST){
$username = $_POST["uname"];
$email = $_POST["uemail"];
if (!preg_match('/^[A-Za-z0-9]$/', $username)){
	if(isValidEmail($email)){
		if($_POST["upass"] == $_POST["upass2"]){
			if($db->getOne('SELECT COUNT(*) FROM users WHERE uname = ?s',$username) == 0){
				$bytes = openssl_random_pseudo_bytes(32);
$verificationcodeemail = hash('sha256', bin2hex($bytes)."".$emailverifysalt);
$passhash = hash('sha256', $_POST["upass"]."".$passwordusersalt);
$mail = new PHPMailer(true);                          // Passing `true` enables exceptions
try {
    //Recipients
    $mail->setFrom('helpga@xonr.ru', 'XONR Software');
    $mail->addAddress($email);
    //Content
    $mail->isHTML(true);                                  // Set email format to HTML
    $mail->Subject = 'Verification E-mail';
    $mail->Body    = 'To verify your E-mail address, please click on link: https://ga.xonr.ru/verifyemail/'.$verificationcodeemail;
    $mail->AltBody = 'To verify your E-mail address, please click on link: https://ga.xonr.ru/verifyemail/'.$verificationcodeemail;

    $mail->send();
	$db->query("INSERT INTO users SET uname=?s,uemail=?s,upass=?s,verifyemailcode=?s",$username,$email,$passhash,$verificationcodeemail);
    //echo 'Message has been sent';
} catch (Exception $e) {
   $error = "Error while sending E-mail, please try register later.";
}
			}else $error = "Username not unique";
		}else{$_POST["upass"] = ""; $_POST["upass2"] = "";$error = "Password and password repeat don't match";}
	}else $error = "E-mail format is incorrect";
}else $error = "Only letters and numbers in username allowed";
}
?>
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
        <label for="uname">Username (Must be unique)</label>
      </div>
      <div class="col-75">
        <input type="text" id="uname" name="uname" placeholder="Can be empty" value="<?=$_POST["uname"]?>">
      </div>
    </div>
	<div class="row">
      <div class="col-25">
        <label for="uemail">E-mail (We will send verification e-mail to this address)</label>
      </div>
      <div class="col-75">
        <input type="text" id="uemail" name="uemail" placeholder="Can be empty" value="<?=$_POST["uemail"]?>">
      </div>
    </div>
    <div class="row">
      <div class="col-25">
        <label for="upass">Password</label>
      </div>
      <div class="col-75">
        <input type="password" id="upass" name="upass" value="<?=$_POST["upass"]?>">
      </div>
    </div>
	    <div class="row">
      <div class="col-25">
        <label for="upass2">Repeat Password</label>
      </div>
      <div class="col-75">
        <input type="password" id="upass2" name="upass2" placeholder="Can be empty" value="<?=$_POST["upass2"]?>"></textarea>
      </div>
    </div>
	    <div class="row">
      <div class="col-25">
        <label for="urecaptcha">reCAPTCHA</label>
      </div>
      <div class="col-75">
        <input type="text" id="urecaptcha" name="urecaptcha">
      </div>
    </div>
    <div class="row lastbtn">
      <input type="submit" value="Register">
    </div>
  </form>
</div>
</div>
<?include_once($_SERVER['DOCUMENT_ROOT']."/style/footer.php");?>