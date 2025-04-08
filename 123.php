<?php
include("connection.php");

// Table: myfavorites
$sqlFavorites = "
CREATE TABLE IF NOT EXISTS myfavorites (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    title VARCHAR(255),
    author VARCHAR(255),
    thumbnail TEXT,
    UNIQUE KEY unique_fav (user_id, title),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
";

if (mysqli_query($link, $sqlFavorites)) {
    echo "✅ 'myfavorites' table created successfully.<br>";
} else {
    echo "❌ Error creating 'myfavorites': " . mysqli_error($link) . "<br>";
}

// Table: wishlist
$sqlWishlist = "
CREATE TABLE IF NOT EXISTS wishlist (
    id INT UNSIGNED AUTO_INCREMENT PRIMARY KEY,
    user_id BIGINT UNSIGNED NOT NULL,
    title VARCHAR(255),
    author VARCHAR(255),
    thumbnail TEXT,
    UNIQUE KEY unique_wish (user_id, title),
    FOREIGN KEY (user_id) REFERENCES users(user_id) ON DELETE CASCADE
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4;
";

if (mysqli_query($link, $sqlWishlist)) {
    echo "✅ 'wishlist' table created successfully.";
} else {
    echo "❌ Error creating 'wishlist': " . mysqli_error($link);
}
?>
