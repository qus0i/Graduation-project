<?php
include("connection.php");

if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST['user_id'])) {
    $user_id = mysqli_real_escape_string($link, $_POST['user_id']);

    $deleteQuery = "DELETE FROM users WHERE user_id = '$user_id'";
    if (mysqli_query($link, $deleteQuery)) {
        echo "✅ User deleted successfully.";
    } else {
        echo "❌ Error deleting user: " . mysqli_error($link);
    }
} else {
    echo "Invalid request.";
}
?>
<form action="123.php" method="POST">
  <input type="number" name="user_id" placeholder="Enter User ID" required>
  <button type="submit">Delete User</button>
</form>
