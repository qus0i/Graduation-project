<?php
include ('connection.php'); // الاتصال بقاعدة البيانات

//$sql = "ALTER TABLE forgotpassword MODIFY `time` DATETIME NOT NULL";
//$sql = "INSERT INTO users (id, username, password,email) VALUES (1, 'testuser', 'testpass', 'testpass@gmail.com')";
$sql = "SELECT * FROM users WHERE id = 1";

if ($link->query($sql) === TRUE) {
    echo "تم تعديل العمود time إلى DATETIME بنجاح.";
} else {
    echo "خطأ في تعديل العمود: " . $link->error;
}



$link->close();
?>
