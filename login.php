<?php
session_start();
include("connection.php");

$missingEmail = '<p><strong>Please enter your email address!</strong></p>';
$missingPassword = '<p><strong>Please enter your password!</strong></p>';
$errors = '';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (empty($_POST["loginemail"])) {
        $errors .= $missingEmail;
    } else {
        $email = filter_var($_POST["loginemail"], FILTER_SANITIZE_EMAIL);
    }

    if (empty($_POST["loginpassword"])) {
        $errors .= $missingPassword;
    } else {
        $password = filter_var($_POST["loginpassword"], FILTER_SANITIZE_STRING);
    }

    if ($errors) {
        echo '<div class="alert alert-danger">' . $errors . '</div>';
    } else {
        $email = mysqli_real_escape_string($link, $email);
        $password = mysqli_real_escape_string($link, $password);
        $password = hash('sha256', $password);

        $query = "SELECT * FROM users WHERE email='$email' AND password='$password' LIMIT 1";
        $result = mysqli_query($link, $query);

        if (mysqli_num_rows($result) == 1) {
            $row = mysqli_fetch_assoc($result);
            $_SESSION['user'] = $email;
            $_SESSION['username'] = $row['username']; // ✅ store username
            $_SESSION['user_id'] = $row['id'];
            $_SESSION['profile_img'] = $row['profile_img']; // or whatever variable holds the user ID from the DB

           // $_SESSION['login_message'] = "Successfully logged in!";
            header("Location: ALL_HTML/home.php");
            exit();
        } else {
            echo "<div class='alert alert-danger'>Invalid email or password!</div>";
        }
    }
} else {
    header("Location: home.php");
    exit();
}
?>
