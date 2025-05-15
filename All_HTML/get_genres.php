<?php
include '../connection.php'; // ensure this file sets up $conn

$sql = "
SELECT DISTINCT genre FROM (
  SELECT genre1 AS genre FROM user_genres
  UNION
  SELECT genre2 FROM user_genres
  UNION
  SELECT genre3 FROM user_genres
  UNION
  SELECT genre4 FROM user_genres
  UNION
  SELECT genre5 FROM user_genres
  UNION
  SELECT genre6 FROM user_genres
) AS all_genres
WHERE genre IS NOT NULL AND genre != ''
LIMIT 6;
";


$result = $link->query($sql);

$genres = [];

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $genres[] = $row['genre'];
    }
}

header('Content-Type: application/json');
echo json_encode($genres);
?>
