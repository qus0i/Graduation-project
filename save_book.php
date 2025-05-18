<?php
session_start();
require_once 'connection.php';

header("Content-Type: application/json");

// Read raw input
$raw = file_get_contents("php://input");
file_put_contents("debug_log.txt", "RAW: $raw\n", FILE_APPEND);

// Try to decode JSON
$input = json_decode($raw, true);
file_put_contents("debug_log.txt", "DECODED: " . print_r($input, true) . "\n", FILE_APPEND);

// Fallback to $_POST
if (!$input) {
    $input = $_POST;
    file_put_contents("debug_log.txt", "FALLBACK POST: " . print_r($_POST, true) . "\n", FILE_APPEND);
}

$user_id = $_SESSION['user_id'] ?? 1; // Hardcoded for now
$title = $input['title'] ?? '';
$authors = $input['authors'] ?? '';
$thumbnail = $input['thumbnail'] ?? '';

if (!$user_id || !$title || !$authors || !$thumbnail) {
    http_response_code(400);
    echo json_encode(["error" => "Missing data"]);
    exit;
}
// Check and toggle
$stmt = $link->prepare("SELECT id FROM myfavorites WHERE user_id = ? AND title = ? AND author = ?");
$stmt->bind_param("iss", $user_id, $title, $authors);
$stmt->execute();
$res = $stmt->get_result();

if ($res->num_rows > 0) {
    $del = $link->prepare("DELETE FROM myfavorites WHERE user_id = ? AND title = ? AND author = ?");
    $del->bind_param("iss", $user_id, $title, $authors);
    $del->execute();
    echo json_encode(["status" => "removed"]);
} else {
    $ins = $link->prepare("INSERT INTO myfavorites (user_id, title, author, thumbnail) VALUES (?, ?, ?, ?)");
    $ins->bind_param("isss", $user_id, $title, $authors, $thumbnail);
    $ins->execute();
    echo json_encode(["status" => "added"]);
}
?>
