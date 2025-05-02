<?php
// Path to your comments file
$commentsFile = __DIR__ . '/comments.json';

// Handle POST request to save new comment
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    // Get inputs safely
    $username = $_POST['username'] ?? 'Guest';
    $rating = isset($_POST['rating']) ? intval($_POST['rating']) : 0;
    $comment = trim($_POST['comment'] ?? '');
    if ($rating > 0 && !empty($comment)) {
        // Load existing comments
        $comments = [];
        if (file_exists($commentsFile)) {
            $json = file_get_contents($commentsFile);
            $comments = json_decode($json, true) ?? [];
        }

        // Generate new comment
        $newComment = [
            'username' => htmlspecialchars($username),
            'pfpUrl' => "https://i.pravatar.cc/60?img=" . rand(1, 70),
            'rating' => $rating,
            'comment' => htmlspecialchars($comment),
            'timestamp' => time()
        ];

        // Append new comment
        $comments[] = $newComment;

        // Save back to JSON file
        file_put_contents($commentsFile, json_encode($comments, JSON_PRETTY_PRINT));

        echo 'Success';
    } else {
        echo 'Invalid input.';
    }
    exit;
}

// Handle GET request to return comments
if ($_SERVER['REQUEST_METHOD'] === 'GET') {
    header('Content-Type: application/json');
    if (file_exists($commentsFile)) {
        echo file_get_contents($commentsFile);
    } else {
        echo json_encode([]);
    }
    exit;
}
?>
