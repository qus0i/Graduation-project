<?php
session_start();
$commentsFile = 'comments.json';
function censorText($text, $badWords) {
    // build a word-boundary regex, case-insensitive
    $pattern = '/\b(' . implode('|', array_map('preg_quote', $badWords)) . ')\b/i';
    return preg_replace_callback($pattern, function($m) {
        return str_repeat('*', mb_strlen($m[0]));
    }, $text);
}
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username  = $_POST['username'];
    $rating    = intval($_POST['rating']);
    $raw       = $_POST['comment'];
    $bookId    = $_POST['bookId'];
    // censor it:
    $comment   = censorText($raw, $badWords);
}

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
   $username = isset($_SESSION['username']) ? $_SESSION['username'] : 'GUST';
    $pfpUrl = isset($_SESSION['profile_img']) ? $_SESSION['profile_img'] : 'https://api.dicebear.com/6.x/initials/svg?seed=زائر';

    $rating = intval($_POST['rating']);
    $comment = $_POST['comment'];
    $bookId = $_POST['bookId'];

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
