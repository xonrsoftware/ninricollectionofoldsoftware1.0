<?php

error_reporting(E_ERROR);
include_once 'inc/safemysql.class.php';
include_once 'inc/vkCoverClass.php';

require __DIR__.'/../vendor/autoload.php';
use GDText\Box;
use GDText\Color;
use GDText\TextWrapping;

if ('w51hgfgfo7846tjkd67ht4kji5' == $_GET['secret']) {
    $db = new SafeMySQL();
    $userdata = $db->getRow('SELECT * FROM users WHERE id=?s LIMIT 1', $_SESSION['userid']);
    //if($userdata["duserid"] == "466293410848964609" || $userdata["duserid"] == "261906668349161472"){
    $db2 = new SafeMySQL(array(
        'user' => 'заменить',
        'pass' => 'заменить',
        'db' => 'заменить',
  ));
    $arraypoints = array();
    $allcount = $db2->getOne('SELECT COUNT(*) FROM serverusers WHERE state=1');
    $now = new DateTime();
    $now->setTimezone(new DateTimeZone('Europe/Moscow'));
    $beginOfDay = clone $now;
    // Go to midnight.  ->modify('midnight') does not do this for some reason
    $beginOfDay->modify('today midnight');
    $endOfDay = clone $beginOfDay;
    $endOfDay->modify('tomorrow');
    // adjust from the next day to the end of the day, per original question
    $endOfDay->modify('1 second ago');
    //die($db2->getOne("SELECT COUNT(*) FROM serverusers WHERE leavetime>?i AND leavetime<?i AND state=0",$beginOfDay->format('U')*1000,$endOfDay->format('U')*1000));
    $todaychange = $db2->getOne('SELECT COUNT(*) FROM serverusers WHERE jointime IS NOT NULL AND jointime>?i AND jointime<?i', $beginOfDay->format('U') * 1000, $endOfDay->format('U') * 1000) - $db2->getOne('SELECT COUNT(*) FROM serverusers WHERE leavetime>?i AND leavetime<?i AND state=0', $beginOfDay->format('U') * 1000, $endOfDay->format('U') * 1000);
    $im = imagecreatefrompng('files/vkheadernewv5.png');
    $box = new Box($im);
    $box->setFontFace(__DIR__.'/files/9887_0.otf'); // http://www.dafont.com/minecraftia.font
    $box->setFontColor(new Color(255, 222, 2));
    $box->setTextShadow(new Color(0, 0, 0, 50), 2, 2);
    $box->setFontSize(24);
    $box->setTextWrapping(TextWrapping::NoWrap);
    //$box->setLineHeight(1.5);
    //$box->enableDebug();
    $box->setBox(647, 104, 297, 25);
    $box->setTextAlign('left', 'center');
    $box->draw(
    $db2->getOne('SELECT COUNT(*) FROM serverusers WHERE state=1')
);
    $box->setTextAlign('right', 'center');
    if ($todaychange > 0) {
        $box->setFontColor(new Color(0, 255, 0));
        $box->draw(
    '+'.$todaychange.' СЕГОДНЯ'
);
    } else {
        /*		$box->setFontColor(new Color(255, 0, 0));
        $box->draw(
            $todaychange." СЕГОДНЯ"
        );*/
    }
    $lastuser = $db2->getOne('SELECT username FROM serverusers WHERE state=1 ORDER BY jointime DESC LIMIT 1');
    $box = new Box($im);
    $box->setFontFace(__DIR__.'/files/9887_0.otf'); // http://www.dafont.com/minecraftia.font
    $box->setFontColor(new Color(255, 222, 2));
    $box->setTextShadow(new Color(0, 0, 0, 50), 2, 2);
    $box->setFontSize(24);
    $box->setTextWrapping(TextWrapping::NoWrap);
    //$box->setLineHeight(1.5);
    //$box->enableDebug();
    $box->setBox(951, 104, 297, 25);
    $box->setTextAlign('left', 'center');
    //$lastuser = mb_convert_encoding($val["gamename"], 'UTF-8', 'UTF-8');
    $lastuser = preg_replace('/[^\|\'\"\`\~\?\{\}\[\]\^\!\@\#\$\%\\\&\*\)\(\+\-\.\:\;\p{L}\p{M}\p{Z}\p{N}\p{P}]/u', '?', $lastuser);
    $lastuserstr = trim($lastuser);

    if (mb_strlen($lastuser) > 22) {
        $lastuserstr = trim(mb_substr($lastuser, 0, 22)).'..';
    }

    $box->draw(
    $lastuserstr
);
    $mainrooms = array();
    foreach ($db2->getAll('SELECT * FROM roomslist WHERE groupid=1') as $val) {
        array_push($mainrooms, $val['channelid']);
    }
    $rpgrooms = array();
    foreach ($db2->getAll('SELECT * FROM roomslist WHERE groupid=2') as $val) {
        array_push($rpgrooms, $val['channelid']);
    }
    $cooprooms = array();
    foreach ($db2->getAll('SELECT * FROM roomslist WHERE groupid=3') as $val) {
        array_push($cooprooms, $val['channelid']);
    }
    //$activegames = ;
    $amainrooms = '';
    $amaincount = 1;
    $arpgrooms = '';
    $arpgcount = 1;
    $acooprooms = '';
    $acoopcount = 1;
    foreach ($db2->getAll('SELECT * FROM rememberedgamenames ORDER BY timestampexp DESC') as $val) {
        //$roomname = trim(str_replace(':', '', $val["gamename"]));
        //$val["gamename"] = preg_replace('/[[:^print:]]/', '', $val["gamename"]);
        //$val["gamename"] = mb_convert_encoding($val["gamename"], 'UTF-8', 'UTF-8');
        $val['gamename'] = preg_replace('/[^\|\'\"\`\~\?\{\}\[\]\^\!\@\#\$\%\\\&\*\)\(\+\-\.\:\;\p{L}\p{M}\p{Z}\p{N}\p{P}]/u', '?', $val['gamename']);
        $val['gamename'] = trim($val['gamename']);
        //$val["gamename"] = trim(preg_replace("/[^0-9A-Za-zА-Яа-яЁё\s\"\'\.\-\#\$\@\!\$\%\^\&\*\(\)\_\=\\\<\>\?\,\:\;\]\[\}\{\+\*\^\~\`]/","",$val["gamename"]));
        if (mb_strlen($val['gamename']) > 22) {
            //	if(mb_substr(mb_strtoupper($val["gamename"]), 0, 27) !=  mb_strtoupper($val["gamename"]))
            $roomname = trim(mb_substr(mb_strtoupper($val['gamename']), 0, 22)).'..';
        }
        //else $roomname = mb_strtoupper($val["gamename"]);
        else {
            $roomname = mb_strtoupper($val['gamename']);
        }

        if (in_array($val['roomid'], $mainrooms)) {
            if ($amaincount < 9) {
                if ($amainrooms == '') {
                    $amainrooms = $roomname;
                } else {
                    $amainrooms .= "\n".$roomname;
                }
                ++$amaincount;
            }
        } elseif (in_array($val['roomid'], $rpgrooms)) {
            if ($arpgcount < 9) {
                if ($arpgrooms == '') {
                    $arpgrooms = $roomname;
                } else {
                    $arpgrooms .= "\n".$roomname;
                }
                ++$arpgcount;
            }
        } elseif (in_array($val['roomid'], $cooprooms)) {
            if ($acoopcount < 9) {
                if ($acooprooms == '') {
                    $acooprooms = $roomname;
                } else {
                    $acooprooms .= "\n".$roomname;
                }
                ++$acoopcount;
            }
        }
    }
    //print_r($cooprooms);
    //MAINROOMS
    $box = new Box($im);
    $box->setFontFace(__DIR__.'/files/9887_0.otf'); // http://www.dafont.com/minecraftia.font
    $box->setFontColor(new Color(255, 222, 2));
    $box->setTextShadow(new Color(0, 0, 0, 50), 2, 2);
    $box->setFontSize(20);
    $box->setTextWrapping(TextWrapping::NoWrap);
    //$box->setLineHeight(1.5);
    //$box->enableDebug();
    $box->setBox(341, 176, 297, 220);
    $box->setTextAlign('left', 'top');
    $box->draw(
    mb_strtoupper($amainrooms)
);
    //ROLEPLAYROOMS
    $box = new Box($im);
    $box->setFontFace(__DIR__.'/files/9887_0.otf'); // http://www.dafont.com/minecraftia.font
    $box->setFontColor(new Color(255, 222, 2));
    $box->setTextShadow(new Color(0, 0, 0, 50), 2, 2);
    $box->setFontSize(20);
    $box->setTextWrapping(TextWrapping::NoWrap);
    //$box->setLineHeight(1.5);
    //$box->enableDebug();
    $box->setBox(646, 176, 297, 220);
    $box->setTextAlign('left', 'top');
    $box->draw(
    mb_strtoupper($arpgrooms)
);
    //OTHERGAMES
    $box = new Box($im);
    $box->setFontFace(__DIR__.'/files/9887_0.otf'); // http://www.dafont.com/minecraftia.font
    $box->setFontColor(new Color(255, 222, 2));
    $box->setTextShadow(new Color(0, 0, 0, 50), 2, 2);
    $box->setFontSize(20);
    $box->setTextWrapping(TextWrapping::NoWrap);
    //$box->setLineHeight(1.5);
    //$box->enableDebug();
    $box->setBox(951, 176, 297, 220);
    $box->setTextAlign('left', 'top');
    $box->draw(
    mb_strtoupper($acooprooms)
);
    imagepng($im, 'inc/tempvk.png');
    $vk = new CoverVK('заменить', 'заменить');

    $url = $vk->getCoverUrl(0, 0, 1590, 400);

    $load = $vk->uploadPhoto($url, 'inc/tempvk.png');
    print_r($vk->installCover($load['hash'], $load['photo']));
    $vk = new CoverVK('заменить', 'заменить');

    $url = $vk->getCoverUrl(0, 0, 1590, 400);

    $load = $vk->uploadPhoto($url, 'inc/tempvk.png');
    print_r($vk->installCover($load['hash'], $load['photo']));
}
/*header("Content-type: image/png;");
imagepng($im, "test.png", 9, PNG_ALL_FILTERS);*/
