<?php
session_start();
require_once '../connection.php';
mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

header("Content-Type: application/json");

$input = json_decode(file_get_contents("php://input"), true);

$table = $input['table'] ?? '';
$user_id = $_SESSION['user_id'] ;
$title = $input['title'] ?? '';
$authors = $input['authors'] ?? '';
$thumbnail = substr($input['thumbnail'] ?? '', 0, 32);

// Secure table whitelist
$allowedTables = ['myfavorites', 'mylibrary', 'myopencover', 'myclosedcover', 'mydustyshelves'];
if (!in_array($table, $allowedTables)) {
    echo json_encode(['error' => 'Invalid table']);
    exit;
}

if (!$user_id || !$title || !$authors || !$thumbnail) {
    echo json_encode(["error" => "Missing data"]);
    exit;
}

// Toggle logic
$stmt = $link->prepare("SELECT id FROM $table WHERE user_id = ? AND title = ? AND author = ?");
$stmt->bind_param("iss", $user_id, $title, $authors);
$stmt->execute();
$res = $stmt->get_result();

if ($res->num_rows > 0) {
    $del = $link->prepare("DELETE FROM $table WHERE user_id = ? AND title = ? AND author = ?");
    $del->bind_param("iss", $user_id, $title, $authors);
    $del->execute();
    echo json_encode(["status" => "removed"]);
} else {
    $ins = $link->prepare("INSERT INTO $table (user_id, title, author, thumbnail) VALUES (?, ?, ?, ?)");
    $ins->bind_param("isss", $user_id, $title, $authors, $thumbnail);
    $ins->execute();
    echo json_encode(["status" => "added"]);
}
