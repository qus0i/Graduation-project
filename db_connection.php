<?php
// Parse the Railway DB URL
$url = "mysql://root:lrWXeczfBOxqWEarLXZOiWLLLHhXkwWq@shortline.proxy.rlwy.net:32522/railway";
$parts = parse_url($url);

$host = $parts['host'];              // containers-us-west-34.railway.app
$port = $parts['port'];              // 5872
$user = $parts['user'];              // your DB username
$pass = $parts['pass'];              // your DB password
$dbname = ltrim($parts['path'], '/'); // your DB name

// Connect to the MySQL DB
$conn = new mysqli($host, $user, $pass, $dbname, $port);

// Check the connection
if ($conn->connect_error) {
    die("❌ Connection failed: " . $conn->connect_error);
}

echo "✅ Connected to Railway MySQL!";
?>
