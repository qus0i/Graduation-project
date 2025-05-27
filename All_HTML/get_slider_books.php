<?php
session_start();
header('Content-Type: application/json');

include_once '../connection.php';

$allowed_tables = ['myfavorites', 'mylibrary', 'myopencover', 'myclosedcover', 'mydustyshelves'];

$slider = $_GET['slider'] ?? 'myfavorites';
if (!in_array($slider, $allowed_tables)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid slider parameter']);
    exit;
}

$user_id = $_SESSION['user_id'];

$query = "SELECT book_Id, title, author FROM `$slider` WHERE user_id = ?";
$stmt = $link->prepare($query);
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$books = [];
while ($row = $result->fetch_assoc()) {
    $books[] = [
        'book_id' => $row['book_Id'], // توحيد الاسم للـ JS
        'title'   => $row['title'],
        'author'  => $row['author']
    ];
}

echo json_encode($books);
$link->close();
