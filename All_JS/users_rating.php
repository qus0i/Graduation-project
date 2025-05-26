<?php
require_once '../connection.php';

// Assuming you get bookId from POST or JSON input
$input = json_decode(file_get_contents("php://input"), true);
$bookId = $input['bookId'];

$checkQuery = "SELECT book_rating FROM myratings WHERE book_id = ?";
$stmt->bind_param("s", $bookId);
$stmt = $link->prepare($checkQuery);

$stmt->execute();
$result = $stmt->get_result();

$response = [];

if ($row = $result->fetch_assoc()) {
    $response['book_rating'] = $row['book_rating'];
} else {
    $response['book_rating'] = 0.0 ; // or "not_found"
}

header('Content-Type: application/json');
echo json_encode($response);

$stmt->close();
$link->close();
?>
