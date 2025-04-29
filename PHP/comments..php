<?php
// comments.php

$commentsFile = 'comments.json';

// Handle POST request: save new comment
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = htmlspecialchars($_POST['username']);
    $rating = intval($_POST['rating']);
    $comment = htmlspecialchars($_POST['comment']);

    // Generate a random profile picture (from 1 to 70)
    $pfpUrl = 'https://i.pravatar.cc/60?img=' . rand(1, 70);

    // Load existing comments
    $comments = file_exists($commentsFile) ? json_decode(file_get_contents($commentsFile), true) : [];

    // Add new comment to the beginning of the array
    array_unshift($comments, [
        'username' => $username,
        'pfpUrl' => $pfpUrl,
        'rating' => $rating,
        'comment' => $comment,
        'timestamp' => time()
    ]);

    // Save updated comments back to file
    file_put_contents($commentsFile, json_encode($comments, JSON_PRETTY_PRINT));
    echo 'Comment added successfully!';
    exit;
}

// Handle GET request: return comments
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    if (file_exists($commentsFile)) {
        $comments = json_decode(file_get_contents($commentsFile), true);
        echo json_encode($comments);
    } else {
        echo json_encode([]);
    }
    exit;
}

// If not POST or GET, return error
http_response_code(405);
echo 'Method Not Allowed';
?>
