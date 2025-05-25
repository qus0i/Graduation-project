<?php
// This is a placeholder. Real implementation requires PAAPI signed requests.
$genre = $_GET['genre'] ?? 'fiction';

// Fake mocked data for now
echo json_encode([
  'books' => [
    [
      'id' => '123456',
      'title' => "$genre Book 1",
      'authors' => 'Author Name',
      'image' => 'https://via.placeholder.com/150',
      'rating' => 4.5
    ],
    // Add more...
  ]
]);
?>
