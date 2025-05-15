<?php
include("../connection.php");
/*session_start();
echo '<pre>';
print_r($_SESSION);
echo '</pre>';*/


if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $rkey = mysqli_real_escape_string($link, $_POST['rkey']);
    $newPassword = hash('sha256', $_POST['newpassword']);

    // Validate key and get user_id
    $query = "SELECT user_id FROM forgotpassword WHERE rkey='$rkey' AND status='pending' LIMIT 1";
    $result = mysqli_query($link, $query);

    if ($row = mysqli_fetch_assoc($result)) {
        $user_id = $row['user_id'];

        // Update password
        mysqli_query($link, "UPDATE users SET password='$newPassword' WHERE id='$user_id'");

        // Mark the token as used
        mysqli_query($link, "UPDATE forgotpassword SET status='used' WHERE rkey='$rkey'");

        echo "Password has been updated. <a href='../All_HTML/Signbook.html'>Login now</a>";
    } else {
        echo "Invalid or expired reset key.";
    }
}
?>

