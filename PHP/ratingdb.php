<?php
function getrating($rating, $bookId) {
   
    include("../connection.php");
    $userId = $_SESSION['user_id'] ?? 0; // Get the user ID from the session
    $rating = intval($rating); // Ensure rating is an integer
    $bookId = mysqli_real_escape_string($link, $bookId); // Sanitize book ID

    // Check if a rating already exists for this user and book
    $checkQuery = "SELECT book_rating FROM myratings WHERE book_id='$bookId'";
    $checkResult = mysqli_query($link, $checkQuery);

    if (mysqli_num_rows($checkResult) == 1) {
        $row = mysqli_fetch_assoc($checkResult);
        $_SESSION['rating'] = $row['book_rating'];
        $updateRating = $_SESSION['rating'];
        $updateRating = ($updateRating + $rating)/2.00;
        // Update existing rating
        $updateQuery = "UPDATE myratings SET book_rating='$updateRating' WHERE book_id='$bookId'";
        mysqli_query($link, $updateQuery);
    } else {
        // Insert new rating
        $insertQuery = "INSERT INTO myratings ( book_id, book_rating) VALUES ( '$bookId', '$rating')";
        mysqli_query($link, $insertQuery);
        return $rating;
    }
    return $updateRating;
    mysqli_close($link); // Close the database connection
}


?>
