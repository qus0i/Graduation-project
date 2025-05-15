<?php
include ('connection.php'); // الاتصال بقاعدة البيانات

$sql = "ALTER TABLE forgotpassword MODIFY `time` DATETIME NOT NULL";

if ($link->query($sql) === TRUE) {
    echo "تم تعديل العمود time إلى DATETIME بنجاح.";
} else {
    echo "خطأ في تعديل العمود: " . $link->error;
}

$link->close();
?>
