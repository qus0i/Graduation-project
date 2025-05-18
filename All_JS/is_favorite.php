<?php
session_start();
require_once '../connection.php';

header('Content-Type: application/json');
$input = json_decode(file_get_contents("php://input"), true);

$user_id = $_SESSION['user_id'] ?? 1;
$title = $input['title'] ?? '';
$authors = $input['authors'] ?? '';

$stmt = $link->prepare("SELECT id FROM myfavorites WHERE user_id = ? AND title = ? AND author = ?");
$stmt->bind_param("iss", $user_id, $title, $authors);
$stmt->execute();
$res = $stmt->get_result();

echo json_encode(['isFavorite' => $res->num_rows > 0]);
