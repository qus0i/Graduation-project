<?php
session_start();
include("connection.php");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $username = mysqli_real_escape_string($link, $_POST['fullname']); // from the HTML input
    $email = mysqli_real_escape_string($link, $_POST['email']);
    $password = mysqli_real_escape_string($link, $_POST['password']);

    // Validation
    if (empty($username) || empty($email) || empty($password)) {
        echo "<div class='alert alert-danger'>Please fill in all fields.</div>";
        exit();
    }

    // Check if user already exists
    $checkQuery = "SELECT * FROM users WHERE email='$email' LIMIT 1";
    $checkResult = mysqli_query($link, $checkQuery);

    if (mysqli_num_rows($checkResult) > 0) {
        echo "<div class='alert alert-danger'>Email already registered.</div>";
        exit();
    }

    // Hash the password
    $hashedPassword = hash('sha256', $password);

    // Insert into database
    $query = "INSERT INTO users (username, email, password) VALUES ('$username', '$email', '$hashedPassword')";
    if (mysqli_query($link, $query)) {
        $_SESSION['user'] = $email;
        $_SESSION['login_message'] = "Account created successfully!";
        header("Location: home.php");
        exit();
    } else {
        echo "<div class='alert alert-danger'>Something went wrong. Try again.</div>";
    }
} else {
    header("Location: register.html");
    exit();
}
?>
