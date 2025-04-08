<?php
session_start();
include("connection.php");

if (!isset($_SESSION['user'])) {
    header("Location: login.html");
    exit();
}

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST['title'])) {
    $title = mysqli_real_escape_string($link, $_POST['title']);
    $email = $_SESSION['user'];

    // Get user_id
    $query = "SELECT user_id FROM users WHERE email='$email' LIMIT 1";
    $result = mysqli_query($link, $query);

    if ($row = mysqli_fetch_assoc($result)) {
        $user_id = $row['user_id'];
        $delete = "DELETE FROM wishlist WHERE user_id='$user_id' AND title='$title'";
        mysqli_query($link, $delete);
    }
}

header("Location: wishlist.php");
exit();
?>
