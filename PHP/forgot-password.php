<?php
session_start();
include("../connection.php");

// PHPMailer
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;
require '../vendor/autoload.php';

$missingEmail = '<p><strong>Please enter your email address!</strong></p>';
$invalidEmail = '<p><strong>Please enter a valid email address!</strong></p>';
$errors = '';
$resultMessage = '';

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    if (empty($_POST["forgotemail"])) {
        $errors .= $missingEmail;
    } else {
        $email = filter_var($_POST["forgotemail"], FILTER_SANITIZE_EMAIL);
        if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
            $errors .= $invalidEmail;
        }
    }

    if ($errors) {
        $resultMessage = '<div class="alert alert-danger">' . $errors . '</div>';
    } else {
        // Check if email exists
        $query = "SELECT * FROM users WHERE email='$email' LIMIT 1";
        $result = mysqli_query($link, $query);

        if (mysqli_num_rows($result) === 1) {
            // Generate token
            $user = mysqli_fetch_assoc($result);
            $user_id = $user['id'];
            $rkey = bin2hex(random_bytes(16));
            $time = date("Y-m-d H:i:s");
            $status = 'pending';

            // Store token in forgotpassword table
            $insert = "INSERT INTO forgotpassword (user_id, rkey, time, status) VALUES ('$user_id', '$rkey', '$time', '$status')";
            mysqli_query($link, $insert);

            // Send email with reset link
            $resetLink = "http://localhost/Graduation-project/PHP/resetpassword.php?rkey=$rkey";

            $mail = new PHPMailer(true);
            try {
                $mail->isSMTP();
                $mail->Host = 'smtp.gmail.com';
                $mail->SMTPAuth = true;
                $mail->Username = 'qusimoh99@gmail.com';      // change this
                $mail->Password = 'feub vywj mmvf wxja';         // change this
                $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
                $mail->Port = 465;

                $mail->setFrom('qusimoh99@gmail.com', 'Book System');
                $mail->addAddress($email);
                $mail->isHTML(true);
                $mail->Subject = 'Reset Your Password';
                $mail->Body = "Click the link below to reset your password:<br><a href='$resetLink'>$resetLink</a>";

                $mail->send();
                $resultMessage = "<div class='alert alert-success'>Check your email inbox to reset your password.</div>";
            } catch (Exception $e) {
                $resultMessage = "<div class='alert alert-danger'>Message could not be sent. Mailer Error: {$mail->ErrorInfo}</div>";
            }
        } else {
            $resultMessage = "<div class='alert alert-danger'>This email is not registered.</div>";
        }
    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Forgot Password</title>
  <link rel="stylesheet" href="style.css" />

  <style>
    body {
      margin: 0;
      background-color: #0B0804;
      font-family: Arial, sans-serif;
      color: #E7D6C4;
      display: flex;
      justify-content: center;
      align-items: center;
      height: 100vh;
    }

    .container {
      text-align: center;
      width: 90%;
      max-width: 400px;
    }

    h2 {
      color: #F9C172;
      margin-bottom: 16px;
    }

    p {
      margin-bottom: 24px;
    }

    input[type="email"] {
      width: 100%;
      padding: 12px;
      border: none;
      border-radius: 6px;
      margin-bottom: 16px;
      font-size: 16px;
    }

    button {
      width: 100%;
      padding: 12px;
      background-color: #0D1425;
      color: white;
      border: none;
      border-radius: 6px;
      font-weight: bold;
      font-size: 16px;
      cursor: pointer;
    }

    button:hover {
      opacity: 0.9;
    }

    .back-link {
      margin-top: 16px;
      display: inline-block;
      color: #F9C172;
      text-decoration: none;
      font-size: 14px;
    }

    .back-link:hover {
      text-decoration: underline;
    }
  </style>

</head>
<body>
    <div class="container">
  <h2>Reset Your Password</h2>
   <p>Enter your email address below and we'll send you<br />instructions to reset your password.</p>

  <?php if ($resultMessage) echo $resultMessage; ?>

  <form action="forgot-password.php" method="POST">
    <label>Enter your email:</label>
    <input type="email" name="forgotemail" placeholder="Your email address" required>
    <button type="submit">Send Reset Link</button>
    <a class="back-link" href="../ALL_HTML/Signbook.html">Return to Login</a>
  </form>
  </div>
</body>
</html>
