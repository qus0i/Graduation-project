<?php
use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require '../vendor/autoload.php';
include("../connection.php");

if ($_SERVER["REQUEST_METHOD"] === "POST") {
    $email = mysqli_real_escape_string($link, $_POST['email']);

    // Get user_id
    $userQuery = mysqli_query($link, "SELECT user_id FROM users WHERE email='$email' LIMIT 1");
    if ($user = mysqli_fetch_assoc($userQuery)) {
        $user_id = $user['user_id'];
        $rkey = bin2hex(random_bytes(16));
        $time = date("Y-m-d H:i:s");
        $status = 'pending';

        // Store reset info
        mysqli_query($link, "INSERT INTO forgotpassword (user_id, rkey, time, status) VALUES ('$user_id', '$rkey', '$time', '$status')");

        $resetLink = "http://localhost/Graduation-project/resetpassword.php?rkey=$rkey";

        // Send email
        $mail = new PHPMailer(true);
        try {
            $mail->isSMTP();
            $mail->Host = 'smtp.gmail.com';
            $mail->SMTPAuth = true;
            $mail->Username = 'qusimoh99@gmail.com'; // Replace
            $mail->Password = 'feub vywj mmvf wxja';    // Replace
            $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS;
            $mail->Port = 465;

            $mail->setFrom('qusimoh99@gmail.com', 'Book System');
            $mail->addAddress($email);
            $mail->isHTML(true);
            $mail->Subject = 'Password Reset';
            $mail->Body = "Click <a href='$resetLink'>here</a> to reset your password.";

            $mail->send();
            echo "Reset link sent to your email.";
        } catch (Exception $e) {
            echo "Mailer Error: {$mail->ErrorInfo}";
        }
    } else {
        echo "Email not found.";
    }
}
?>
