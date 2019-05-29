<?php
session_start();
error_reporting(E_ERROR);
if (!isset($_SESSION['userid'])) {
    header('Location: /sworkparse/auth.php');
    die();
}
include_once 'inc/safemysql.class.php';
$db = new SafeMySQL();
$userdata = $db->getRow('SELECT * FROM users WHERE id=?s LIMIT 1', $_SESSION['userid']);
//if($userdata["duserid"] == "466293410848964609" || $userdata["duserid"] == "261906668349161472"){
$db2 = new SafeMySQL(array(
        'user' => 'заменить',
        'pass' => 'заменить',
        'db' => 'заменить',
  ));
  $arraypoints = array();

  /*foreach($db2->getAll("SELECT * FROM serverusers WHERE jointime IS NOT NULL") as $value){
     // array_push($arraypoints,array('x' => intval($value["jointime"]),'y'=>1));
     array_push($arraypoints,intval($value["jointime"]));
  }
   sort($arraypoints);
   //die(print_r($arraypoints));*/
/*   $toxtxt = array();
   $firstdate = null;
   $datecount = 0;
   $maxcount = 0;
   $arrayccoo = $db2->getAll("SELECT * FROM serverusers WHERE jointime IS NOT NULL ORDER BY jointime");
   $len = count($arrayccoo);
   $labels = array();
   $allvals = array();
      $labels2 = array();
   $allvals2 = array();
         $labels3 = array();
   $allvals3 = array();
  foreach($arrayccoo as $index => $value){
     // array_push($arraypoints,array('x' => intval($value["jointime"]),'y'=>1));
     if($firstdate != null){
         $old = DateTime::createFromFormat('U.u', sprintf('%14.3f', $firstdate/1000));
          $old->setTimezone(new DateTimeZone("Europe/Moscow"));
         $new = DateTime::createFromFormat('U.u', sprintf('%14.3f', $value["jointime"]/1000));
          $new->setTimezone(new DateTimeZone("Europe/Moscow"));
          //echo($new->format('U').":".$new->format('U').":".$new->format('Y-m-d H:i:sP')."<BR>");
         if(strtotime($old->format('Y-m-d')) != strtotime($new->format('Y-m-d'))){

            // die($old->format('Y-m-d H:i:sP'));
            if($datecount > $maxcount)$maxcount = $datecount;
             array_push($labels,$old->format('Y-m-d'));
             array_push($allvals,$datecount);
             //$daterr = new DateTime($old->format('Y-m-d'));
            // $daterrold->setTimezone(new DateTimeZone("Europe/Moscow"));
             $beginOfDay = clone $old;

// Go to midnight.  ->modify('midnight') does not do this for some reason
$beginOfDay->modify('today midnight');

$endOfDay = clone $beginOfDay;
$endOfDay->modify('tomorrow');
// adjust from the next day to the end of the day, per original question
$endOfDay->modify('1 second ago');
             array_push($labels2,$old->format('Y-m-d'));
             array_push($allvals2,$db2->getOne("SELECT COUNT(*) FROM serverusers WHERE jointime IS NOT NULL AND jointime>?i AND jointime<?i AND state=1",$beginOfDay->format('U')*1000,$endOfDay->format('U')*1000));
             array_push($labels3,$old->format('Y-m-d'));
             array_push($allvals3,$db2->getOne("SELECT COUNT(*) FROM serverusers WHERE leavetime>?i AND leavetime<?i AND state=0",$beginOfDay->format('U')*1000,$endOfDay->format('U')*1000));
            // array_push($toxtxt,array('x' => $old->format('U')*1000,'y'=>$datecount));
                      $firstdate = $new->format('U')*1000;
         $datecount = 1;
         }else{
             $datecount++;
              if ($index == $len - 1) {
                           $old = DateTime::createFromFormat('U.u', sprintf('%14.3f', $firstdate/1000));
          $old->setTimezone(new DateTimeZone("Europe/Moscow"));
          if($datecount > $maxcount)$maxcount = $datecount;
                       array_push($labels,$old->format('Y-m-d'));
             array_push($allvals,$datecount);
                          $beginOfDay = clone $old;

// Go to midnight.  ->modify('midnight') does not do this for some reason
$beginOfDay->modify('today midnight');

$endOfDay = clone $beginOfDay;
$endOfDay->modify('tomorrow');
// adjust from the next day to the end of the day, per original question
$endOfDay->modify('1 second ago');

         array_push($labels2,$old->format('Y-m-d'));
             array_push($allvals2,$db2->getOne("SELECT COUNT(*) FROM serverusers WHERE jointime IS NOT NULL AND jointime>?i AND jointime<?i AND state=1",$beginOfDay->format('U')*1000,$endOfDay->format('U')*1000));
                          array_push($labels3,$old->format('Y-m-d'));
             array_push($allvals3,$db2->getOne("SELECT COUNT(*) FROM serverusers WHERE leavetime>?i AND leavetime<?i AND state=0",$beginOfDay->format('U')*1000,$endOfDay->format('U')*1000));
                 //array_push($toxtxt,array('x' => $old->format('U')*1000,'y'=>$datecount));
              }

         }
  }else{
               $old = DateTime::createFromFormat('U.u', sprintf('%14.3f', $value["jointime"]/1000));
          $old->setTimezone(new DateTimeZone("Europe/Moscow"));
         $firstdate = $old->format('U')*1000;
         $datecount = 1;
     }
     //array_push($arraypoints,array($value["jointime"]));
  }
/*     $toxtxt2 = array();
   $firstdate = null;

   $datecount = 0;
   $arrayccoo = $db2->getAll("SELECT * FROM serverusers WHERE jointime IS NOT NULL AND (leavetime IS NULL OR jointime>leavetime) ORDER BY jointime");
   $len = count($arrayccoo);
   $labels2 = array();
   $allvals2 = array();
  foreach($arrayccoo as $index => $value){
     // array_push($arraypoints,array('x' => intval($value["jointime"]),'y'=>1));
     if($firstdate != null){
         $old = DateTime::createFromFormat('U.u', sprintf('%14.3f', $firstdate/1000));
          $old->setTimezone(new DateTimeZone("Europe/Moscow"));
         $new = DateTime::createFromFormat('U.u', sprintf('%14.3f', $value["jointime"]/1000));
          $new->setTimezone(new DateTimeZone("Europe/Moscow"));
          //echo($new->format('U').":".$new->format('U').":".$new->format('Y-m-d H:i:sP')."<BR>");
         if(strtotime($old->format('Y-m-d')) != strtotime($new->format('Y-m-d'))){

            // die($old->format('Y-m-d H:i:sP'));
             array_push($labels2,$old->format('Y-m-d'));
             array_push($allvals2,$datecount);
             array_push($toxtxt2,array('x' => $old->format('U')*1000,'y'=>$datecount));
                      $firstdate = $new->format('U')*1000;
         $datecount = 1;
         }else{
              if ($index == $len - 1) {
                           $old = DateTime::createFromFormat('U.u', sprintf('%14.3f', $firstdate/1000));
          $old->setTimezone(new DateTimeZone("Europe/Moscow"));
                       array_push($labels2,$old->format('Y-m-d'));
             array_push($allvals2,$datecount);
                  array_push($toxtxt2,array('x' => $old->format('U')*1000,'y'=>$datecount));
              }else
             $datecount++;
         }
  }else{
               $old = DateTime::createFromFormat('U.u', sprintf('%14.3f', $value["jointime"]/1000));
          $old->setTimezone(new DateTimeZone("Europe/Moscow"));
         $firstdate = $old->format('U')*1000;
         $datecount = 1;
     }
     //array_push($arraypoints,array($value["jointime"]));
  }*/
  $now = new DateTime();
  $now->setTimezone(new DateTimeZone('Europe/Moscow'));
  $now->modify('-1 month');
  
  $firstdate = $db2->getRow('SELECT * FROM serverusers WHERE jointime>?i ORDER BY jointime',$now->format('U')*1000);
  $firstdate = DateTime::createFromFormat('U.u', sprintf('%14.3f', $firstdate['jointime'] / 1000));
  $firstdate->setTimezone(new DateTimeZone('Europe/Moscow'));
  $firstdate->modify('today midnight');
  
  $now = new DateTime();
  $now->setTimezone(new DateTimeZone('Europe/Moscow'));
  
  $dayscount = $now->diff($firstdate)->format('%a');
  $daysarray = array();
  array_push($daysarray, $firstdate->format('U'));
  for ($x = 1; $x <= $dayscount; ++$x) {
      $nextdate = clone $firstdate;
      $nextdate->modify('+'.$x.' day');
      array_push($daysarray, $nextdate->format('U'));
      //echo "The number is: $x <br>";
  }
//print_r($daysarray);
   $toxtxt = array();
   $labels = array();
   $allvals = array();
   //$labels2 = array();
   $allvals2 = array();
   //$labels3 = array();
   $allvals3 = array();
   $allvals4 = array();
   $allvals5 = array();
   $allvals6 = array();
  foreach ($daysarray as $value) {
      $new = DateTime::createFromFormat('U.u', sprintf('%14.3f', $value));
      $new->setTimezone(new DateTimeZone('Europe/Moscow'));
      $beginOfDay = clone $new;
      // Go to midnight.  ->modify('midnight') does not do this for some reason
      $beginOfDay->modify('today midnight');
      $endOfDay = clone $beginOfDay;
      $endOfDay->modify('tomorrow');
      // adjust from the next day to the end of the day, per original question
      $endOfDay->modify('1 second ago');
      array_push($labels, $new->format('Y-m-d'));
      array_push($allvals, $db2->getOne('SELECT COUNT(*) FROM serverusers WHERE jointime IS NOT NULL AND jointime>?i AND jointime<?i', $beginOfDay->format('U') * 1000, $endOfDay->format('U') * 1000));
      //array_push($labels2,$new->format('Y-m-d'));
      array_push($allvals2, $db2->getOne('SELECT COUNT(*) FROM serverusers WHERE jointime IS NOT NULL AND jointime>?i AND jointime<?i AND state=1', $beginOfDay->format('U') * 1000, $endOfDay->format('U') * 1000));
      //array_push($labels3,$new->format('Y-m-d'));
      array_push($allvals3, $db2->getOne('SELECT COUNT(*) FROM serverusers WHERE leavetime>?i AND leavetime<?i AND state=0', $beginOfDay->format('U') * 1000, $endOfDay->format('U') * 1000));
      //START CUSTOM
      array_push($allvals4, $db2->getOne("SELECT COUNT(*) FROM serverusers WHERE jointime>?i AND jointime<?i AND (invitecode='QrqBWE6' OR invitecode='YWvYW7C')", $beginOfDay->format('U') * 1000, $endOfDay->format('U') * 1000));
      array_push($allvals6, $db2->getOne("SELECT COUNT(*) FROM serverusers WHERE jointime>?i AND jointime<?i AND (invitecode='uZQZZmy')", $beginOfDay->format('U') * 1000, $endOfDay->format('U') * 1000));
  }
?>
  <head>
    <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.3.1/jquery.min.js"></script>
	<script src="/sworkparse/files/moment-with-locales.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.bundle.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.7.2/Chart.min.js"></script>
	
	  <script type="text/javascript">
  window.onload = function () {
var ctx = document.getElementById("chartContainer").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: <?php echo json_encode($labels); ?>,
        datasets: [{
            label: 'Новых пользователей',
            data: <?php echo json_encode($allvals); ?>,
			lineTension: 0,
    borderColor: 'purple',
    backgroundColor: 'transparent',
    pointBorderColor: 'purple',
    pointBackgroundColor: 'purple',
    pointRadius: 5,
    pointHoverRadius: 10,
    pointHitRadius: 30,
    pointBorderWidth: 2,
    pointStyle: 'rectRounded'
        },{
            label: 'https://vk.com/ninri и реклама',
            data: <?php echo json_encode($allvals6); ?>,
			lineTension: 0,
    borderColor: 'blue',
    backgroundColor: 'transparent',
    pointBorderColor: 'blue',
    pointBackgroundColor: 'blue',
    pointRadius: 5,
    pointHoverRadius: 10,
    pointHitRadius: 30,
    pointBorderWidth: 2,
    pointStyle: 'rectRounded'
        },{
            label: 'Пиратское приглашение',
            data: <?php echo json_encode($allvals4); ?>,
			lineTension: 0,
    borderColor: 'black',
    backgroundColor: 'transparent',
    pointBorderColor: 'black',
    pointBackgroundColor: 'black',
    pointRadius: 5,
    pointHoverRadius: 10,
    pointHitRadius: 30,
    pointBorderWidth: 2,
    pointStyle: 'rectRounded'
        },{
            label: 'Остались на сервере',
            data: <?php echo json_encode($allvals2); ?>,
			lineTension: 0,
    borderColor: 'orange',
    backgroundColor: 'transparent',
    pointBorderColor: 'orange',
    pointBackgroundColor: 'orange',
    pointRadius: 5,
    pointHoverRadius: 10,
    pointHitRadius: 30,
    pointBorderWidth: 2,
    pointStyle: 'rectRounded'
        },{
            label: 'Всего покинуло сервер',
            data: <?php echo json_encode($allvals3); ?>,
			lineTension: 0,
    borderColor: 'red',
    backgroundColor: 'transparent',
    pointBorderColor: 'red',
    pointBackgroundColor: 'red',
    pointRadius: 5,
    pointHoverRadius: 10,
    pointHitRadius: 30,
    pointBorderWidth: 2,
    pointStyle: 'rectRounded'
        }]
    },
    options: {
        scales: {
			  
            yAxes: [{
				
                ticks: {
					stepSize: 1,
                    beginAtZero:true,
					callback: function(value, index, values) {
        if (Math.floor(value) === value) {
            return value;
        }
    }
                }
            }]
        }
    }
});
/*var ctx = document.getElementById("chartContainer2").getContext('2d');
var myChart = new Chart(ctx, {
    type: 'line',
    data: {
        labels: <?php echo json_encode($labels2); ?>,
        datasets: [{
            label: 'Остались на сервере',
            data: <?php echo json_encode($allvals2); ?>,
			lineTension: 0,
    borderColor: 'orange',
    backgroundColor: 'transparent',
    pointBorderColor: 'orange',
    pointBackgroundColor: 'orange',
    pointRadius: 5,
    pointHoverRadius: 10,
    pointHitRadius: 30,
    pointBorderWidth: 2,
    pointStyle: 'rectRounded'
        }]
		},
    options: {
        scales: {
			  
            yAxes: [{
				
                ticks: {
					max:<?php echo $maxcount; ?>,
					stepSize: 1,
                    beginAtZero:true,
					callback: function(value, index, values) {
        if (Math.floor(value) === value) {
            return value;
        }
    }
                }
            }]
        }
    }
});*/
  
  }
  </script>
  <style>
  body{
	  text-align:center;
  }
.wrapper {
  display: inline-block;
}
.wrapper div {
  margin-left: 10px;
  text-align:left;
}
.wrapper canvas {
  display: inline-block;
  vertical-align: middle;
}
  </style>
  </head>
<body>

<div class="wrapper" style="width:80%;">
  <canvas id="chartContainer"></canvas>
  <div>Всего пользователей на сервере: <?php echo $db2->getOne('SELECT COUNT(*) FROM serverusers WHERE state=1'); ?><br>Остались на сервере за всё время работы сервера, а не только в конкретный день, на графике отмечены временем подключения к серверу.
</div>
</div>
<!--<div style="width:50%;float:left;">
    <canvas id="chartContainer2"></canvas>
	
</div>-->
</body>
<?php
//}
?>