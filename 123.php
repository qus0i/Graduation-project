<?php
include("connection.php");

/*if ($_SERVER["REQUEST_METHOD"] === "POST" && isset($_POST['user_id'])) {
    $user_id = mysqli_real_escape_string($link, $_POST['user_id']);

    //DELETE FROM user_genra WHERE user_id = ?;
    //$deleteQuery = "DELETE FROM users WHERE id = '$user_id'";
    $deleteQuery = "DELETE FROM forgotpassword WHERE id = '$user_id'";
    if (mysqli_query($link, $deleteQuery)) {
        echo "✅ User deleted successfully.";
    } else {
        echo "❌ Error deleting user: " . mysqli_error($link);
    }
} else {
    echo "Invalid request.";
}*/

// Include your database linkection
 // Adjust path if needed

// Name of the table to delete
$tableName = 'lists';

// SQL to drop the table
$sql = "DROP TABLE IF EXISTS `$tableName`";

// Execute the query
if ($link->query($sql) === TRUE) {
    echo "Table '$tableName' deleted successfully.";
} else {
    echo "Error deleting table: " . $link->error;
}

// Close the linkection
$link->close();
?>

?>
<!--<form action="123.php" method="POST">
  <input type="number" name="user_id" placeholder="Enter User ID" required>
  <button type="submit">Delete User</button>
</form>-->
