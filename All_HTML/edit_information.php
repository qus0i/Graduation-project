<?php
session_start();
require '../connection.php'; // Your DB linkection file

if (!isset($_SESSION['user_id'])) {
    die("Unauthorized access");
}

$user_id = $_SESSION['user_id'];

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if ($_POST['form_type'] === 'general') {
        // Update Username and Email
        $username = trim($_POST['username']);
        $email = trim($_POST['email']);

        if (!empty($username) && !empty($email)) {
            $stmt = $link->prepare("UPDATE users SET username = ?, email = ? WHERE id = ?");
            $stmt->bind_param("ssi", $username, $email, $user_id);
            if ($stmt->execute()) {
                echo "User info updated successfully.";
            } else {
                echo "Error updating user info.";
            }
            $stmt->close();
        } else {
            echo "Username and Email cannot be empty.";
        }

    } elseif ($_POST['form_type'] === 'password') {
        // Change Password
        $old_password = $_POST['old_password'];
        $new_password = $_POST['new_password'];
        $confirm_password = $_POST['confirm_password'];

        if ($new_password !== $confirm_password) {
            die("Passwords do not match.");
        }

        // Check old password
        $stmt = $link->prepare("SELECT password FROM users WHERE id = ?");
        $stmt->bind_param("i", $user_id);
        $stmt->execute();
        $stmt->bind_result($hashed_password);
        $stmt->fetch();
        $stmt->close();

        if (password_verify($old_password, $hashed_password)) {
            $new_hashed_password = hash('sha256',$new_password);
            $stmt = $link->prepare("UPDATE users SET password = ? WHERE id = ?");
            $stmt->bind_param("si", $new_hashed_password, $user_id);
            if ($stmt->execute()) {
                echo "Password changed successfully.";
            } else {
                echo "Failed to change password.";
            }
            $stmt->close();
        } else {
            echo "Old password is incorrect.";
        }
    }
}
?>
