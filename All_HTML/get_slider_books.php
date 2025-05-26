<?php
session_start();
header('Content-Type: application/json');


// Database linkection parameters - replace with your own
include_once '../connection.php'; // Include your database configuration file

// Allowed tables for sliders
$allowed_tables = ['myfavorites', 'mylibrary', 'myopencover', 'myclosedcover', 'mydustyshelves'];

// Get slider parameter and validate
$slider = $_GET['slider'] ?? 'myfavorites';
if (!in_array($slider, $allowed_tables)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid slider parameter']);
    exit;
}


$user_id = $_SESSION['user_id']; 



// Prepare and execute query
$query = "SELECT id, user_id, title, author, thumbnail FROM `$slider` WHERE user_id = '$user_id'";
$result = mysqli_query($link, $query);
if (!$result) {
    http_response_code(500);
    echo json_encode(['error' => 'Database query failed']);
    exit;
}
$books = [];
while ($row = $result->fetch_assoc()) {
    // Extract thumbnail image URL from Google Books link if needed
    $row['thumbnail'] = extractGoogleBooksThumbnail($row['thumbnail']);
    $books[] = $row;
}

//$stmt->close();
//$link->close();

// Output JSON
echo json_encode($books);



/**
 * Extract the thumbnail image URL from a Google Books API link or direct thumbnail URL
 * If the stored thumbnail is a Google Books link (e.g., https://books.google.com/books?id=xxxx),
 * you might want to convert it to a direct thumbnail image link if possible.
 * 
 * This function currently returns the input assuming it is a direct thumbnail URL.
 * Adjust this function based on how your data is stored.
 */
function extractGoogleBooksThumbnail($url) {
    // Check if URL is a Google Books page link, e.g., https://books.google.com/books?id=...
    if (strpos($url, 'books.google.com') !== false) {
        // You can call Google Books API here or parse URL for thumbnail
        // For simplicity, return a placeholder or the URL itself
        // TODO: Implement actual extraction from Google Books API if needed
        return $url;
    }
    // Otherwise assume URL is already direct thumbnail link
    return $url;
}
