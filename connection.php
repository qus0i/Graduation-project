<?php
// Parse the Railway DB URL
$url = "mysql://root:NWgFxpnPgUhdfkdmejYtARqUBNXbLrxJ@crossover.proxy.rlwy.net:35233/railway";
$parts = parse_url($url);

$host = $parts['host'];              // containers-us-west-34.railway.app
$port = $parts['port'];              // 5872
$user = $parts['user'];              // your DB username
$pass = $parts['pass'];              // your DB password
$dbname = ltrim($parts['path'], '/'); // your DB name

// Connect to the MySQL DB
$link = new mysqli($host, $user, $pass, $dbname, $port);

// Check the connection
if ($link->connect_error) {
    die("❌ Connection failed: " . $link->connect_error);
}

//echo "✅ Connected to Railway MySQL!";
?>
