<?php
session_start();
include_once("ratingdb.php"); // Include the database connection file
$commentsFile = 'comments.json';
function censorText($text) {
   $badWords = [
    'fuck',
    'shit',
    'bitch',
    'asshole',
    'bastard',
    'dick',
    'pussy',
    'damn',
    'sticky paper',
    'crap',
    'slut',
    'cunt',      
    'faggot',    
    'whore',
    'motherfucker',
    'mother fucker',
    'cock',
    'dildo',
    'bollocks',
    'bugger',
    'twat',
    'wanker',
    'tit',
    'hoe',
    'retard',     
    'fag',
    'rape',
    'rapist',
    'suck my',
    'blowjob',
    'handjob',
    'jerk off',
    'screw you',
    'dickhead',
    'shithead',
    'asswipe',
    'buttfuck',
    'rimjob',
    'fucker',
    'fucking',
    'sex',
    'porn',
    'boobs',
    'tits',
    'cum',
    'testicles',
    'vagina',
    'penis'
]; 
// Add your list of bad words here
    // build a word-boundary regex, case-insensitive
    $pattern = '/\b(' . implode('|', array_map('preg_quote', $badWords)) . ')\b/i';
    return preg_replace_callback($pattern, function($m) {
        return str_repeat('*', mb_strlen($m[0]));
    }, $text);
}/*
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username  = $_POST['username'];
    $rating    = intval($_POST['rating']);
    $raw       = $_POST['comment'];
    $bookId    = $_POST['bookId'];
    // censor it:
    $comment   = censorText($raw);
}*/

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
   $username = isset($_SESSION['username']) ? $_SESSION['username'] : 'GUST';
    $pfpUrl = isset($_SESSION['profile_img']) ? $_SESSION['profile_img'] : 'https://api.dicebear.com/6.x/initials/svg?seed=GUST';
    $rating = intval($_POST['rating']);
    $filtercomment = $_POST['comment'];
    $bookId = $_POST['bookId'];
    getrating ($rating, $bookId); // Call the function to save the rating
    $comment =censorText($filtercomment); // Call the function to censor the comment


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
