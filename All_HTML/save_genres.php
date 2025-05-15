<?php
// save_genres.php

include ('../connection.php'); // تأكد من وجود ملف الاتصال بالداتابيس

session_start();

if (!isset($_SESSION['user_id'])) {
    // لو المستخدم غير مسجل دخول، ارجع لصفحة تسجيل الدخول أو عرض خطأ
   header("Location: login.php");
    exit();
}

$user_id = $_SESSION['user_id'];
//$user_id = 1;

// استلام المصفوفة من الفورم
if (isset($_POST['genres']) && is_array($_POST['genres'])) {
    $genres = $_POST['genres'];

    // نملأ حتى 6 أنوع لو أقل
    for ($i = count($genres); $i < 6; $i++) {
        $genres[$i] = '';
    }

    // تحضير جملة الإدخال مع أسماء الأعمدة
    $sql = "INSERT INTO user_genres (user_id, genre1, genre2, genre3, genre4, genre5, genre6)
            VALUES (?, ?, ?, ?, ?, ?, ?)
            ON DUPLICATE KEY UPDATE
              genre1 = VALUES(genre1),
              genre2 = VALUES(genre2),
              genre3 = VALUES(genre3),
              genre4 = VALUES(genre4),
              genre5 = VALUES(genre5),
              genre6 = VALUES(genre6)";

    $stmt = $link->prepare($sql);
    if (!$stmt) {
        die("Prepare failed: " . $link->error);
    }

    // ربط المتغيرات: نوعهم i=integer, s=string
    $stmt->bind_param(
        "issssss",
        $user_id,
        $genres[0],
        $genres[1],
        $genres[2],
        $genres[3],
        $genres[4],
        $genres[5]
    );

    if ($stmt->execute()) {
        // نجاح الإدخال
        header("Location: home.php"); // عدل لصفحة الوجهة
        exit();
    } else {
        die("Execute failed: " . $stmt->error);
    }

} else {
    die("No genres selected or invalid data.");
}

?>
