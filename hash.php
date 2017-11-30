<?php
require("config.php");
if(isset($_GET['connect']) && $_GET['connect'] == $connectKey && isset($_GET['result'])) {
    $result=$_GET['result'];
    $fp = fopen($logfile, "a") or die("Unable to open file!");
    fwrite($fp, $result."\r\n") or die("Unable to write to file!");
    fflush($fp);
    fclose($fp);
}
?>
