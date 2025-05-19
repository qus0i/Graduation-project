<?php
session_start();
require_once '../connection.php';

header("Content-Type: application/json");

$input = json_decode(file_get_contents("php://input"), true);
$user_id = $_SESSION['user_id'] ?? 1; // temporary default
$title = $input['title'] ?? '';
$authors = $input['authors'] ?? '';
$thumbnail = substr($input['thumbnail'] ?? '', 0, 32);

if (!$user_id || !$title || !$authors || !$thumbnail) {
    echo json_encode(["error" => "Missing data"]);
    exit;
}

$check = $link->prepare("SELECT id FROM mylibrary WHERE user_id = ? AND title = ? AND author = ?");
$check->bind_param("iss", $user_id, $title, $authors);
$check->execute();
$res = $check->get_result();

if ($res->num_rows > 0) {
    // Try to delete
    $del = $link->prepare("DELETE FROM mylibrary WHERE user_id = ? AND title = ? AND author = ?");
    $del->bind_param("iss", $user_id, $title, $authors);
    if (!$del->execute()) {
        file_put_contents("debug_log.txt", "DELETE ERROR: " . $del->error . "\n", FILE_APPEND);
    } else {
        echo json_encode(["status" => "removed"]);
    }
} else {
    // Try to insert
    $ins = $link->prepare("INSERT INTO mylibrary (user_id, title, author, thumbnail) VALUES (?, ?, ?, ?)");
    $ins->bind_param("isss", $user_id, $title, $authors, $thumbnail);
    if (!$ins->execute()) {
        file_put_contents("debug_log.txt", "INSERT ERROR: " . $ins->error . "\n", FILE_APPEND);
        echo json_encode(["error" => "insert failed"]);
    } else {
        echo json_encode(["status" => "added"]);
    }
}

