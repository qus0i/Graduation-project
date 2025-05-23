<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta http-equiv="X-UA-Compatible" content="IE=edge">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>My Profile</title>
  <!-- Bootstrap CSS -->
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <!-- Custom Styles -->
  <link rel="stylesheet" href="../All_CSS/main.css">
</head>
<body>
<?php
session_start();
include_once '../connection.php'; // Include your database connection file

// Get user info
$userId     = $_SESSION['user_id'] ?? null;
$username   = $_SESSION['username'] ?? 'Guest';
$profileImg = $_SESSION['profile_img'] ?? 'img/default-avatar.png';

// Lists
$lists = ['favourite'=>'Favourite','library'=>'Library','openCover'=>'Open Cover','closedCover'=>'Closed Cover','dustyShelves'=>'Dusty Shelves'];

// Initialize counts
$counts = array_fill_keys(array_keys($lists), 0);

// Database connection with error handling
try {
    $pdo = new PDO('mysql:host=localhost;dbname=your_db;charset=utf8', 'db_user', 'db_pass', [
        PDO::ATTR_ERRMODE => PDO::ERRMODE_EXCEPTION
    ]);
    // Fetch counts
    $stmt = $pdo->prepare("SELECT list_name, COUNT(*) AS cnt FROM user_book_lists WHERE user_id = ? GROUP BY list_name");
    $stmt->execute([$userId]);
    while ($row = $stmt->fetch(PDO::FETCH_ASSOC)) {
        if (isset($counts[$row['list_name']])) {
            $counts[$row['list_name']] = $row['cnt'];
        }
    }
} catch (PDOException $e) {
    // Log error and show user-friendly message
    error_log('DB Connection failed in profile.php: ' . $e->getMessage());
    echo '<div class="alert alert-danger m-4">Unable to connect to the database. Please try again later.</div>';
    // Optionally stop further script execution
    exit;
}
?>

<!-- Navbar Include -->
<div id="navbar-placeholder"></div>
<script>
  fetch('nav.html')
    .then(res => res.text())
    .then(html => document.getElementById('navbar-placeholder').innerHTML = html);
</script>

<!-- Profile & Counters Section -->
<section class="py-5 bg-dark text-light">
  <div class="container">
    <div class="row align-items-center">
      <div class="col-md-4 text-center mb-4 mb-md-0">
        <img src="<?php echo htmlspecialchars($profileImg); ?>" alt="Profile" class="rounded-circle" style="width:200px;height:200px;object-fit:cover;">
        <h2 class="mt-3 text-warning"><?php echo htmlspecialchars($username); ?></h2>
      </div>
      <div class="col-md-8">
        <div class="row text-center">
          <?php foreach ($lists as $key=>$title): ?>
          <div class="col-6 col-lg-4 mb-4">
            <div class="counter__item">
              <div class="counter__item__text text-light">
                <img src="img/icons/<?php echo $key; ?>.png" alt="<?php echo $title; ?>" style="width:40px;filter: invert(80%);">
                <h2 class="counter_num text-warning"><?php echo $counts[$key]; ?></h2>
                <p><?php echo $title; ?></p>
              </div>
            </div>
          </div>
          <?php endforeach; ?>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Book Carousels -->
<div class="container mt-5">
  <?php foreach ($lists as $key=>$title): ?>
  <section class="mb-5">
    <div class="row">
      <div class="col-md-2 d-flex flex-column justify-content-center align-items-center">
        <h3 class="fw-bold text-center lh-base"><?php echo $title; ?></h3>
        <a href="list-detail.php?list=<?php echo $key; ?>" class="btn btn-outline-primary mt-2 slider-butt homePage-button">See All</a>
      </div>
      <div class="col-md-10">
        <div id="carousel-<?php echo $key; ?>" class="carousel slide" data-bs-ride="carousel">
          <div class="carousel-inner" id="inner-<?php echo $key; ?>"></div>
          <button class="carousel-control-prev" type="button" data-bs-target="#carousel-<?php echo $key; ?>" data-bs-slide="prev">
            <span class="carousel-control-prev-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Previous</span>
          </button>
          <button class="carousel-control-next" type="button" data-bs-target="#carousel-<?php echo $key; ?>" data-bs-slide="next">
            <span class="carousel-control-next-icon" aria-hidden="true"></span>
            <span class="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>
  </section>
  <?php endforeach; ?>
</div>

<!-- Bootstrap JS -->
<script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>

<!-- Carousel Loader Script -->
<script>
  document.addEventListener('DOMContentLoaded', () => {
    const lists = ['favourite','library','openCover','closedCover','dustyShelves'];
    lists.forEach(name => loadCarousel(name));
  });

  function loadCarousel(listName) {
    fetch(`getBooks.php?list=${listName}`)
      .then(res => res.json())
      .then(books => {
        const inner = document.getElementById(`inner-${listName}`);
        const perSlide = window.innerWidth < 576 ? 1 : window.innerWidth < 768 ? 2 : 4;
        let html = '';
        books.forEach((b, i) => {
          const title = b.title.length>30?b.title.slice(0,30)+'…':b.title;
          const authors = b.authors.join(', ');
          const rating = Math.round(b.avg_rating);
          const stars = Array.from({length:5},(_,k)=><span class="star ${k<rating?'filled':''}" title="${b.avg_rating.toFixed(1)}">★</span>).join('');
          if (i%perSlide===0) html+=`<div class="carousel-item ${i===0?'active':''}"><div class="row gx-2">`;
          html+=`<div class="col-md-3"><a href="book-detail.php?bookId=${b.id}" class="text-decoration-none text-dark"><div class="card h-100"><img src="${b.image_url}" class="card-img-top" alt="${title}" loading="lazy"><div class="card-body"><h5 class="card-title mb-1">${title}</h5><p class="card-text small text-muted">${authors}</p><div class="stars">${stars}</div></div></div></a></div>`;
          if ((i+1)%perSlide===0||i===books.length-1) html+='</div></div>';
        });
        inner.innerHTML = html;
      })
      .catch(err=>console.error('Error loading',listName,err));
  }
</script>
</body>
</html>