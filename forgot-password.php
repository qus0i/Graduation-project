<?php
//Start session
session_start();
//Connect to the database
include('connection.php');

//Check user inputs
    //Define error messages
$missingEmail = '<p><strong>Please enter your email address!</strong></p>';
$invalidEmail = '<p><strong>Please enter a valid email address!</strong></p>';
    //Get email
    //Store errors in errors variable
if(empty($_POST["forgotemail"])){
    $errors .= $missingEmail;   
}else{
    $email = filter_var($_POST["forgotemail"], FILTER_SANITIZE_EMAIL);
    if(!filter_var($email, FILTER_VALIDATE_EMAIL)){
        $errors .= $invalidEmail;   
    }
}
    
    //If there are any errors
        //print error message
if($errors){
    $resultMessage = '<div class="alert alert-danger">' . $errors .'</div>';
    echo $resultMessage;
    exit;
}
    //else: No errors
        //Prepare variables for the query
$email = mysqli_real_escape_string($link, $email);
        //Run query to check if the email exists in the users table
$sql = "SELECT * FROM users WHERE email = '$email'";
$result = mysqli_query($link, $sql);
if(!$result){
    echo '<div class="alert alert-danger">Error running the query!</div>'; exit;
}
$count = mysqli_num_rows($result);
//If the email does not exist
            //print error message
if($count != 1){
    echo '<div class="alert alert-danger">That email does not exist on our database!</div>';  exit;
}
        
        //else
            //get the user_id
$row = mysqli_fetch_array($result, MYSQLI_ASSOC);
$user_id = $row['user_id'];
            //Create a unique  activation code
$key = bin2hex(openssl_random_pseudo_bytes(16));
            //Insert user details and activation code in the forgotpassword table
$time = time();
$status = 'pending';
$sql = "INSERT INTO forgotpassword (`user_id`, `rkey`, `time`, `status`) VALUES ('$user_id', '$key', '$time', '$status')";
$result = mysqli_query($link, $sql);
if(!$result){
    echo '<div class="alert alert-danger">There was an error inserting the users details in the database!</div>'; 
    exit;
}

            //Send email with link to resetpassword.php with user id and activation code

$message = "Please click on this link to reset your password:\n\n";
$message .= "http://localhost/graduation-project/resetpassword.php?user_id=$user_id&key=$key";
/*if(mail($email, 'Reset your password', $message, 'From:'.'developmentisland@gmail.com')){
        //If email sent successfully
                //print success message
       echo "<div class='alert alert-success'>An email has been sent to $email. Please click on the link to reset your password.</div>";
}*/

//////////////

use PHPMailer\PHPMailer\PHPMailer;
use PHPMailer\PHPMailer\Exception;

require 'vendor/autoload.php'; // Load PHPMailer

$mail = new PHPMailer(true);

try {
    // SMTP Configuration
    $mail->isSMTP();
    $mail->Host = 'smtp.gmail.com'; // SMTP Server
    $mail->SMTPAuth = true;
    $mail->Username = 'qusimoh99@gmail.com'; // Your Gmail
    $mail->Password = 'feub vywj mmvf wxja'; // Your App Password (Generated from Google)
    $mail->SMTPSecure = PHPMailer::ENCRYPTION_SMTPS; // TLS Encryption
    $mail->Port = 465;

    // Email Content
    $mail->setFrom('qusimoh99@gmail.com', 'Notes App'); // Sender
    $mail->addAddress($email); // Recipient

    $mail->isHTML(true);
    $mail->Subject = 'Confirm your Registration';

    // Activation Link
    $projectRoot = "http://localhost/NotesAppFinalFinal/";
    $activationLink = $projectRoot . "9.%20Notes%20App%20(Bootstrap%20PHP%20mySQL)/activate.php?email=" . urlencode($email) . "&key=$activationKey";
    
    $mail->Body = "<h3>Please click the link below to activate your account:</h3>
                   <p><a href='$activationLink'>$activationLink</a></p>";

    // Send Email
    if ($mail->send()) {
        echo "<div class='alert alert-success'>Thank you for registering! A confirmation email has been sent to <b>$email</b>. Please check your inbox and click the activation link.</div>";
    }

} catch (Exception $e) {
    echo "<div class='alert alert-danger'>Message could not be sent. Mailer Error: {$mail->ErrorInfo}</div>";
}



    ?>