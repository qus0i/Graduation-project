<?php
include '../connection.php'; // Ensure this file sets up $conn

$slider = $_GET['slider'] ?? '';
$allowed = ['myfavorite', 'mylibrary', 'myopencover', 'myclosedcover', 'mydustyshelves'];

if (!in_array($slider, $allowed)) die('Invalid table');

$sql = "SELECT * FROM `$slider`";
$res = mysqli_query($link, $sql) or die(mysqli_error($link));

$data = [];
while ($row = mysqli_fetch_assoc($res)) {
    $data[] = $row;
}

echo "<pre>";
print_r($data);
