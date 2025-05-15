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
    //هبد قصي 
    $result = mysqli_query($link, $query);
if ($result) {
    // Retrieve the inserted user's ID
    $user_id = mysqli_insert_id($link);
    
    $_SESSION['user'] = $email;
    $_SESSION['username'] = $username;
    $_SESSION['user_id'] = $user_id;

    // Optional redirect or confirmation
    header("Location: ALL_HTML/preferences.html");
    exit();
   /* echo '<pre>';
    print_r($_SESSION);
    echo '</pre>';*/
} else {
    echo "<div class='alert alert-danger'>Something went wrong. Try again.</div>";
}

} else {
    header("Location: ALL_HTML/signbook.html");
    exit();
}
?>
