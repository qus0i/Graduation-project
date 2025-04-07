<?php
session_start();
if (!isset($_SESSION['user'])) {
    header("Location: login.html");
    exit();
}

include("connection.php");

$email = $_SESSION['user'];  // this holds the logged-in email
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
    <h2>Welcome, <?php echo $_SESSION['username']; ?> !</h2>
    <nav>
      <a href="logout.php">Logout</a>
    </nav>
  </header>

  <?php if ($loginMessage): ?>
    <div class="alert alert-success"><?php echo $loginMessage; ?></div>
  <?php endif; ?>

  <main>
    <h3>Recommended Books:</h3>
    <ul>
      <li><a href="book-details.php?id=1">Book Title 1</a></li>
      <li><a href="book-details.php?id=2">Book Title 2</a></li>
      <li><a href="book-details.php?id=3">Book Title 3</a></li>
    </ul>
  </main>
</body>
</html>
