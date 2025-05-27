<?php
require_once '../connection.php';

// الحصول على بيانات JSON من الطلب
$input = json_decode(file_get_contents("php://input"), true);
$bookId = $input['bookId'];

// إعداد الاستعلام
$checkQuery = "SELECT book_rating FROM myratings WHERE book_id = ?";
$stmt = $link->prepare($checkQuery); // تحضير الاستعلام أولاً

if ($stmt) {
    $stmt->bind_param("s", $bookId); // ثم ربط المتغيرات
    $stmt->execute();
    $result = $stmt->get_result();

    $response = [];

    if ($row = $result->fetch_assoc()) {
        $response['book_rating'] = $row['book_rating'];
    } else {
        $response['book_rating'] = 0.0; // أو "not_found"
    }

    // إغلاق الموارد
    $stmt->close();
} else {
    // في حال فشل التحضير
    $response = ['error' => 'Query preparation failed.'];
}

// إرجاع النتيجة بصيغة JSON
header('Content-Type: application/json');
echo json_encode($response);

$link->close();
?>
