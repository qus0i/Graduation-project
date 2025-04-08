<?php
session_start();
include("connection.php");

if (!isset($_SESSION['user'])) {
    header("Location: login.html");
    exit();
}

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $title = mysqli_real_escape_string($link, $_POST['title']);
    $author = mysqli_real_escape_string($link, $_POST['author']);
    $thumbnail = mysqli_real_escape_string($link, $_POST['thumbnail']);
    $type = $_POST['type']; // 'favorite' or 'wishlist'

    // Get user_id from session email
    $email = $_SESSION['user'];
    $userQuery = mysqli_query($link, "SELECT user_id FROM users WHERE email='$email' LIMIT 1");
    if ($userRow = mysqli_fetch_assoc($userQuery)) {
        $user_id = $userRow['user_id'];

        // Choose table
        $table = $type === 'favorite' ? 'myfavorites' : 'wishlist';

        // Insert
        $sql = "INSERT IGNORE INTO $table (user_id, title, author, thumbnail)
                VALUES ('$user_id', '$title', '$author', '$thumbnail')";
        if (mysqli_query($link, $sql)) {
            header("Location: home.php");
            exit();
        } else {
            echo "Error saving book: " . mysqli_error($link);
        }
    } else {
        echo "User not found.";
    }
}
?>
