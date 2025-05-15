<?php
include("../connection.php");

$rkey = $_GET['rkey'] ?? '';
$query = "SELECT * FROM forgotpassword WHERE rkey='$rkey' AND status='pending' LIMIT 1";
$result = mysqli_query($link, $query);

if (mysqli_num_rows($result) == 1) {
?>
<form action="updatepassword.php" method="POST">
  <input type="hidden" name="rkey" value="<?php echo htmlspecialchars($rkey); ?>">
  <input type="hidden" name="user_id" value="<?php echo htmlspecialchars($user_id); ?>">
  <label>New Password:</label>
  <input type="password" name="newpassword" required>
  <button type="submit">Reset Password</button>
</form>
<?php
} else {
    echo "Invalid or expired reset link.";
}
?>
