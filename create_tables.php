<?php
include("connection.php");

// USERS TABLE
$userTable = "CREATE TABLE IF NOT EXISTS users (
    id INT(11) PRIMARY KEY NOT NULL AUTO_INCREMENT,
    username VARCHAR(30) NOT NULL,
    email VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(64) NOT NULL,
    profile_img LONGBLOB
)";

// LISTS TABLE
$listsTable = "CREATE TABLE IF NOT EXISTS lists (
    id INT PRIMARY KEY AUTO_INCREMENT,
    name VARCHAR(50) NOT NULL
)";

// USER_BOOKS TABLE
$userBooksTable = "CREATE TABLE IF NOT EXISTS user_books (
    id INT PRIMARY KEY AUTO_INCREMENT,
    user_id INT NOT NULL,
    book_api_id VARCHAR(100) NOT NULL,
    list_id INT NOT NULL,
    added_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id),
    FOREIGN KEY (list_id) REFERENCES lists(id)
)";
  $genresTable ="  CREATE TABLE IF NOT EXISTS user_genres (
    user_id INT PRIMARY KEY,
    genre1 VARCHAR(15),
    genre2 VARCHAR(15),
    genre3 VARCHAR(15),
    genre4 VARCHAR(15),
    genre5 VARCHAR(15),
    genre6 VARCHAR(15),
    FOREIGN KEY (user_id) REFERENCES users(id)
    )";
    $userReviewsTable = "CREATE TABLE IF NOT EXISTS user_reviews (
    id INT AUTO_INCREMENT PRIMARY KEY,
    user_id INT NOT NULL,
    book_api_id VARCHAR(100) NOT NULL,
    review TEXT,
    rating DECIMAL(2,1),
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (user_id) REFERENCES users(id)
)";


// CREATE TABLE user_genres


// Run queries
if (
    $link->query($userTable) === TRUE &&
    $link->query($listsTable) === TRUE &&
    $link->query($userBooksTable) === TRUE&&
    $link->query($userReviewsTable)=== TRUE &&
    $link->query($genresTable) === TRUE
) {
    echo "All tables created successfully.";
} else {
    echo "Error: " . $link->error;
}

$link->close();
?>
