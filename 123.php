<?php
include("connection.php");

$sql = "ALTER TABLE forgotpassword MODIFY COLUMN time DATETIME";
if (mysqli_query($link, $sql)) {
    echo "Column 'time' successfully updated to DATETIME!";
} else {
    echo "Error updating column: " . mysqli_error($link);
}
?>
