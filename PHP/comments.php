<?php
session_start();
include_once("ratingdb.php"); // Include the database connection file
$commentsFile = 'comments.json';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
   $username = isset($_SESSION['username']) ? $_SESSION['username'] : 'GUST';
    $pfpUrl = isset($_SESSION['profile_img']) ? $_SESSION['profile_img'] : 'https://api.dicebear.com/6.x/initials/svg?seed=زائر';

    $rating = intval($_POST['rating']);
    $comment = $_POST['comment'];
    $bookId = $_POST['bookId'];
   getrating ($rating, $bookId); // Call the function to save the rating



    //$pfpUrl = 'https://api.dicebear.com/6.x/initials/svg?seed=' . urlencode($username);
    $timestamp = time();

    $newComment = [
        'username' => $username,
        'rating' => $rating,
        'comment' => $comment,
        'pfpUrl' => $pfpUrl,
        'timestamp' => $timestamp,
        'bookId' => $bookId
    ];

    $comments = file_exists($commentsFile) ? json_decode(file_get_contents($commentsFile), true) : [];
    $comments[] = $newComment;
    file_put_contents($commentsFile, json_encode($comments, JSON_PRETTY_PRINT));
    echo "Comment added";
} else {
    $bookId = $_GET['bookId'] ?? '';
    $comments = file_exists($commentsFile) ? json_decode(file_get_contents($commentsFile), true) : [];

    // Only return comments for the matching bookId
    $filtered = array_values(array_filter($comments, function ($c) use ($bookId) {
        return isset($c['bookId']) && $c['bookId'] === $bookId;
    }));

    header('Content-Type: application/json');
    echo json_encode($filtered);
}
?>
