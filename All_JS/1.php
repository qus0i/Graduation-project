<?php
session_start();
//include("connection.php");

if (!isset($_SESSION['user_id'])) {
    echo json_encode(['status' => 'error', 'message' => 'User not logged in']);
    exit;
}
file_put_contents('debug_log.txt', print_r($_POST, true), FILE_APPEND);
/*
$user_id = $_SESSION['user_id'];
$title = $_POST['title'];
$author = $_POST['authors'];
$thumbnail = substr($_POST['thumbnail'], 0, 32); // Trim to CHAR(32)

// Check if the book is already in favorites
$query = "SELECT id FROM myfavorites WHERE user_id = ? AND title = ? AND author = ?";
$stmt = $link->prepare($query);
$stmt->bind_param("iss", $user_id, $title, $author);
$stmt->execute();
$result = $stmt->get_result();

if ($result->num_rows > 0) {
    // Remove it from favorites
    $del = $link->prepare("DELETE FROM myfavorites WHERE user_id = ? AND title = ? AND author = ?");
    $del->bind_param("iss", $user_id, $title, $author);
    $del->execute();
    echo json_encode(['status' => 'removed']);
} else {
    // Add to favorites
    $insert = $link->prepare("INSERT INTO myfavorites (user_id, title, author, thumbnail) VALUES (?, ?, ?, ?)");
    $insert->bind_param("isss", $user_id, $title, $author, $thumbnail);
    $insert->execute();
    echo json_encode(['status' => 'saved']);
}
*/
//$link->close();
?>
