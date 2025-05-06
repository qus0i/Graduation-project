<?php
// Path to your comments.json file
$commentsFile = 'comments.json';

// Check if the file exists and read its contents
if (file_exists($commentsFile)) {
    $commentsData = json_decode(file_get_contents($commentsFile), true);

    // Select a random subset of up to 10 comments
    shuffle($commentsData); // Shuffle comments to randomize
    $randomComments = array_slice($commentsData, 0, 10); // Get up to 10 comments

    // Return the selected comments as JSON
    header('Content-Type: application/json');
    echo json_encode($randomComments);
} else {
    // If the comments.json file does not exist
    header('Content-Type: application/json');
    echo json_encode([]);
}
?>
