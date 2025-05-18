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
   
    $forgotpasswordTable = "CREATE TABLE IF NOT EXISTS `forgotpassword` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `user_id` int(11) NOT NULL,
    `rkey` char(32) NOT NULL,
    `time`  DATETIME NOT NULL,
    `status` varchar(7) NOT NULL,
    PRIMARY KEY (`id`)
    )";
    $myfavoritesTable = "CREATE TABLE IF NOT EXISTS `myfavorites` (
    `id` int(11) NOT NULL AUTO_INCREMENT,
    `user_id` int(11) NOT NULL,
    `title` char(32) NOT NULL,
    `author` char(32) NOT NULL,
    `thumbnail` char(32) NOT NULL,
    PRIMARY KEY (`id`),
    FOREIGN KEY (user_id) REFERENCES users(id)
    )";
   


// CREATE TABLE user_genres


// Run queries
if (
    $link->query($userTable) === TRUE &&
    $link->query($genresTable) === TRUE &&
    $link->query($myfavoritesTable) === TRUE &&
    $link->query($forgotpasswordTable) === TRUE
)
 {
    echo "All tables created successfully.";
} else {
    echo "Error: " . $link->error;
}

/*$sql = "ALTER TABLE forgotpassword MODIFY `time` DATETIME NOT NULL";

if ($link->query($sql) === TRUE) {
    echo "تم تعديل العمود time إلى DATETIME بنجاح.";
} else {
    echo "خطأ في تعديل العمود: " . $link->error;
}*/


$link->close();
?>
