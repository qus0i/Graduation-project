<?php
session_start();
if (!isset($_SESSION['user'])) {
    header("Location: login.html");
    exit();
}

include("connection.php");

$email = $_SESSION['user'];
$username = '';

$sql = "SELECT username FROM users WHERE email = '$email' LIMIT 1";
$result = mysqli_query($link, $sql);
if ($row = mysqli_fetch_assoc($result)) {
    $username = $row['username'];
}

$loginMessage = '';
if (isset($_SESSION['login_message'])) {
    $loginMessage = $_SESSION['login_message'];
    unset($_SESSION['login_message']);
}

// ✅ FETCH AND FILTER BOOKS
$books = [];
$uniqueBooks = [];
$seenTitles = [];

$apiUrl = "https://www.googleapis.com/books/v1/volumes?q=fiction&maxResults=12";
$response = file_get_contents($apiUrl);
if ($response !== false) {
    $data = json_decode($response, true);
    if (isset($data['items'])) {
        foreach ($data['items'] as $book) {
            $title = $book['volumeInfo']['title'] ?? '';
            if (!in_array($title, $seenTitles)) {
                $seenTitles[] = $title;
                $uniqueBooks[] = $book;
            }
        }
        // Limit to 6 unique books
        $uniqueBooks = array_slice($uniqueBooks, 0, 6);
    }
} else {
    echo '<div class="alert alert-danger">Failed to fetch book data.</div>';
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <title>Home - Book Recommendation System</title>
  <link rel="stylesheet" href="style.css" />
</head>
<body>
  <header>
    <h2>Welcome, <?php echo $username; ?> !</h2>
    <nav style="margin-top: 10px;">
      <a href="home.php">Home</a> |
      <a href="favorites.php">My Favorite</a> |
      <a href="wishlist.php">Wishlist</a> |
      <a href="logout.php">Logout</a>
    </nav>
  </header>

  <?php if ($loginMessage): ?>
    <div class="alert alert-success"><?php echo $loginMessage; ?></div>
  <?php endif; ?>

  <main>
    <h3>Recommended Books:</h3>
    <div class="book-list">
      <?php foreach ($uniqueBooks as $book):
        $volume = $book['volumeInfo'];
        $title = $volume['title'] ?? 'Unknown Title';
        $authors = $volume['authors'][0] ?? 'Unknown Author';
        $thumbnail = $volume['imageLinks']['thumbnail'] ?? '';
      ?>
        <div class="book-card">
          <?php if ($thumbnail): ?>
            <img src="<?php echo $thumbnail; ?>" alt="Book Cover">
          <?php endif; ?>
          <h4><?php echo htmlspecialchars($title); ?></h4>
          <p>By: <?php echo htmlspecialchars($authors); ?></p>

          <!-- ❤️ Add to Favorites -->
          <form action="save_book.php" method="POST" style="display:inline;">
            <input type="hidden" name="title" value="<?php echo htmlspecialchars($title); ?>">
            <input type="hidden" name="author" value="<?php echo htmlspecialchars($authors); ?>">
            <input type="hidden" name="thumbnail" value="<?php echo $thumbnail; ?>">
            <input type="hidden" name="type" value="favorite">
            <button type="submit" title="Add to Favorites" style="background:none; border:none; cursor:pointer;">❤️</button>
          </form>

          <!-- ➕ Add to Wishlist -->
          <form action="save_book.php" method="POST" style="display:inline;">
            <input type="hidden" name="title" value="<?php echo htmlspecialchars($title); ?>">
            <input type="hidden" name="author" value="<?php echo htmlspecialchars($authors); ?>">
            <input type="hidden" name="thumbnail" value="<?php echo $thumbnail; ?>">
            <input type="hidden" name="type" value="wishlist">
            <button type="submit" title="Add to Wishlist" style="background:none; border:none; cursor:pointer;">➕</button>
          </form>
        </div>
      <?php endforeach; ?>
    </div>
  </main>
</body>
</html>
