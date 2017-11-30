<?php 
/**
 * Server for PHP
 *
 * Modify this script as needed
 */
function getProjectDirectory() {
    return dirname(__FILE__);
}

function getComposer() {
    $path = getProjectDirectory() . '/composer.phar';
    putenv('COMPOSER_HOME=' . getProjectDirectory());
    if (!is_file($path)) {
        file_put_contents(
            $path, file_get_contents(
                'https://getcomposer.org/composer.phar', null, 
                stream_context_create(array('ssl' => array('verify_peer' => false)))
            )                
        );
    }
    return $path;
}
 
function composer($arguments) {    
    $command = array('-c', trim(php_ini_scanned_files()));
    $extensions = explode('-d', shell_exec('cat /proc/' . getmypid() . '/cmdline'));
    foreach ($extensions as $k => $v) {
        $v = trim($v);
        if (stripos($v, 'extension=') === 0) {
            $command[] = '-d ' . $v;
        }
    }
    $command[] = '-d';
    $command[] = 'openssl.cafile=' . getProjectDirectory() . '/cacert.pem';
    $command[] = getComposer();
    $command[] = '--no-interaction';
    $command = array_merge($command, $arguments);
    foreach ($command as $k => $v) {
        $command[$k] = escapeshellarg($v);
    }
    if (!headers_sent()) {
        header('Content-Type: text/plain');
        header('X-Content-Type-Options: nosniff');
    }    
    echo '--- Composer ' . 
        (empty($arguments) ? '' : '(' . implode(', ', $arguments) . ') ') . "--- --- \n\n" . 
        shell_exec(escapeshellcmd(PHP_BINARY) . ' ' . implode(' ', $command) . ' 2>&1') . "\n";
}
$arguments = empty($_GET) ? array() : array_keys($_GET);
if (!empty($arguments)) {
    switch ($arguments[0]) {
        case 'composer':
            composer(array_slice($arguments, 1));
            exit;
        case 'phpinfo':
            phpinfo();
            exit;
    }
}
?><html>
<body>
    <b>Server for PHP</b>
    <ul>
        <li><b>PHP Info</b> - <a href="?phpinfo">?phpinfo</a></li>
        <li>
            <b>Composer</b> - <a href="?composer">?composer</a>,
            <a href="?composer&init">?composer&amp;init</a>,
            <a href="?composer&install">?composer&amp;install</a>, <br />
            ?composer&amp;[argument0]&amp;[argument1]&amp;...&amp;[argumentN]
        </li>
    </ul>
</body>
</html>