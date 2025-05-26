<?php
//mysqli_report(MYSQLI_REPORT_ERROR | MYSQLI_REPORT_STRICT);

session_start();
require_once '../connection.php';
header("Content-Type: application/json");

$input = json_decode(file_get_contents("php://input"), true);
//file_put_contents('debug_toggle.txt', print_r($input, true), FILE_APPEND);

$table = $input['table'];
$user_id = $_SESSION['user_id'];
$book_Id = $input['bookId'];
$title = $input['title'] ?? '';
$author = $input['authors'] ?? ''; // Use 'authors' from frontend, but insert into 'author'
$thumbnail = $input['thumbnail'] ?? '';

// Secure table whitelist
$allowedTables = ['myfavorites', 'mylibrary', 'myopencover', 'myclosedcover', 'mydustyshelves'];
if (!in_array($table, $allowedTables)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid table']);
    exit;
}

if (!$user_id || !$title || !$author || !$thumbnail) {
    http_response_code(401);
    echo json_encode(["error" => "Missing data"]);
    exit;
}

// Toggle logic
$stmt = $link->prepare("SELECT id FROM `$table` WHERE user_id = ? AND book_Id = ?");
$stmt->bind_param("is", $user_id, $book_Id);
$stmt->execute();
$res = $stmt->get_result();

if ($res && $res->num_rows > 0) {
    $del = $link->prepare("DELETE FROM `$table` WHERE user_id = ?  AND book_Id = ?");
    $del->bind_param("is", $user_id, $book_Id);
    $del->execute();
    http_response_code(200);
    echo json_encode(["status" => "removed"]);
    $del->close();
} else {
    $ins = $link->prepare("INSERT INTO `$table` (user_id, title, author, thumbnail, book_Id) VALUES (?, ?, ?, ?, ?)");
    $ins->bind_param("issss", $user_id, $title, $author, $thumbnail, $book_Id);
    $ins->execute();
    http_response_code(300);
    echo json_encode(["status" => "added"]);
    $ins->close();
}
$stmt->close();
$link->close();
/*session_start();
require_once '../connection.php';
header("Content-Type: application/json");
$input = json_decode(file_get_contents("php://input"), true);

$table = $input['table'];
$user_id = $_SESSION['user_id'];
$book_Id = $input['bookId'];
$title = $input['title'] ?? '';
$author = $input['authors'] ?? ''; // Use 'authors' from frontend, but insert into 'author'
$thumbnail = $input['thumbnail'] ?? '';

//echo "Table: $table, User ID: $user_id, Book ID: $book_Id, Title: $title, Author: $author, Thumbnail: $thumbnail\n";

//$sql = "INSERT INTO `$table` (user_id, title, author, thumbnail, book_Id) VALUES ('$user_id', '$title', '$author', '$thumbnail', '$book_Id') ";
$query = "INSERT INTO `$table` (user_id, title, author, thumbnail, book_Id) VALUES ($user_id, '$title', '$author', '$thumbnail', '$book_Id') ";
$result = mysqli_query($link, $query);
http_response_code(202);
echo json_encode(["status" => "added"]);*/

?>
