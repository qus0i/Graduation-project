<?php
// getBooks.php
header('Content-Type: application/json');
session_start();
$userId = $_SESSION['user_id'] ?? 1; // adjust to your auth
$list = $_GET['list'] ?? 'favourite';

// map list names to tables (or to a single table with a `list_name` field)
$allowed = ['favourite','library','openCover','closedCover','dustyShelves'];
if (! in_array($list, $allowed)) {
  http_response_code(400);
  echo json_encode(['error'=>'Invalid list']);
  exit;
}

// connect to MySQL
$pdo = new PDO('mysql:host=localhost;dbname=your_db;charset=utf8', 'db_user', 'db_pass');
$stmt = $pdo->prepare("
  SELECT b.id, b.title, b.authors, b.image_url, b.avg_rating
  FROM books b
  JOIN user_book_lists ubl
    ON ubl.book_id = b.id
   AND ubl.user_id = ?
   AND ubl.list_name = ?
  ORDER BY ubl.added_at DESC
  LIMIT 40
");
$stmt->execute([$userId, $list]);
$books = $stmt->fetchAll(PDO::FETCH_ASSOC);

// normalize authors to array
foreach ($books as &$b) {
  $b['authors'] = explode(',', $b['authors']);
}
echo json_encode($books);
