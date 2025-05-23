<?php
// Enable error reporting for debugging (remove in production)
ini_set('display_errors', 1);
ini_set('display_startup_errors', 1);
error_reporting(E_ALL);

header('Content-Type: application/json');
session_start();

// Database linkection parameters - replace with your own
include_once '../connection.php'; // Include your database configuration file

// Allowed tables for sliders
$allowed_tables = ['myfavorites', 'mylibrary', 'myopencover', 'myclosedcover', 'mydustyshelves'];

// Get slider parameter and validate
$slider = $_GET['slider'] ?? '';
if (!in_array($slider, $allowed_tables)) {
    http_response_code(400);
    echo json_encode(['error' => 'Invalid slider parameter']);
    exit;
}

// Assuming user_id is passed or session is started, replace with your auth logic
// Replace your fixed user_id assignment with:
$user_id = isset($_GET['user_id']) ? intval($_GET['user_id']) : 23; // 23 is default

// Now you can test in Postman with:
// http://localhost/Graduation-project/ALL_HTML/get_slider_books.php?slider=myfavorites&user_id=23
 // TODO: replace with actual user session or request parameter

// Prepare and execute query
$sql = "SELECT id, user_id, title, author, thumbnail FROM `$slider` WHERE user_id = ?";
$stmt = $link->prepare($sql);
if (!$stmt) {
    http_response_code(500);
    echo json_encode(['error' => 'Failed to prepare SQL statement']);
    exit;
}
$stmt->bind_param("i", $user_id);
$stmt->execute();
$result = $stmt->get_result();

$books = [];
while ($row = $result->fetch_assoc()) {
    // Extract thumbnail image URL from Google Books link if needed
    $row['thumbnail'] = extractGoogleBooksThumbnail($row['thumbnail']);
    $books[] = $row;
}

$stmt->close();
$link->close();

// Output JSON
echo json_encode($books);
exit;

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
