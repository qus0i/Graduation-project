<?php
session_start();
require_once '../connection.php';

header("Content-Type: application/json");

$input = json_decode(file_get_contents("php://input"), true);
//file_put_contents('debug_toggle.txt', print_r($input, true), FILE_APPEND);

$table = $input['table'] ;
$user_id = $_SESSION['user_id'] ;
$book_Id = $input['bookId'];

$allowedTables = ['myfavorites', 'mylibrary', 'myopencover', 'myclosedcover', 'mydustyshelves'];
if (!in_array($table, $allowedTables)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid table']);
    exit;
}

$stmt = $link->prepare("SELECT id FROM `$table` WHERE user_id = ? AND book_Id = ?");
$stmt->bind_param("is", $user_id, $book_Id);
$stmt->execute();
$res = $stmt->get_result();

if ($res && $res->num_rows > 0) {
    http_response_code(300);
    echo json_encode(['exists' => true]);
} else {
    http_response_code(200);
    echo json_encode(['exists' => false]);
}

$stmt->close();
$link->close();
?>
