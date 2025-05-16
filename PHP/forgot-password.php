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

<!-- Updated forgot-password.html -->
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Forgot Password</title>
  <link rel="stylesheet" href="style.css">
  <style>

    body {
  margin: 0;
  padding: 0;
  background-color: #0b0804;
  font-family: Arial, sans-serif;
  color: #e7d6c4;
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
}

.container {
  background-color: #1a1a1a;
  padding: 24px;
  border-radius: 8px;
  max-width: 400px;
  width: 100%;
  text-align: center;
  box-shadow: 0 4px 12px rgba(0,0,0,0.5);
}

h2 {
  color: #f9c172;
  margin-bottom: 16px;
}

p {
  margin-bottom: 24px;
  line-height: 1.4;
}

.message {
  margin-bottom: 16px;
  padding: 12px;
  background-color: #2e2e2e;
  border-radius: 4px;
  color: #fff;
}

label {
  display: block;
  text-align: left;
  margin-bottom: 8px;
  font-size: 14px;
}

input[type="email"] {
  width: 370px;
  padding: 12px;
  border: 1px solid #333;
  border-radius: 6px;
  margin-bottom: 16px;
  font-size: 16px;
  background: #2a2a2a;
  color: #e7d6c4;
}

button {
  width: 100%;
  padding: 12px;
  background-color: #f9c172;
  color: #fff;
  border: none;
  border-radius: 6px;
  font-weight: bold;
  font-size: 16px;
  cursor: pointer;
  transition: opacity 0.2s ease;
}

button:hover {
  background-color: #c17b36;
}

.back-link {
  display: inline-block;
  margin-top: 16px;
  color: #f9c172;
  text-decoration: none;
  font-size: 14px;
  transition: color 0.2s ease;
}

.back-link:hover {
  color: #d2a14f;
  text-decoration: underline;
}


  </style>
</head>
<body>
  <div class="container">
    <h2>Reset Your Password</h2>
    <p>
      Enter your email address below and we'll send you<br>
      instructions to reset your password.
    </p>

    <?php if (!empty($resultMessage)): ?>
      <div class="message"><?php echo htmlspecialchars($resultMessage); ?></div>
    <?php endif; ?>

    <form action="forgot-password.php" method="post">
      <label for="forgotemail">Email Address</label>
      <input
        type="email"
        id="forgotemail"
        name="forgotemail"
        placeholder="you@example.com"
        required
      />
      <button type="submit">Send Reset Link</button>
    </form>

    <a class="back-link" href="../ALL_HTML/Signbook.html">
      &larr; Back to Login
    </a>
  </div>
</body>
</html>

