<?php

$commentsFile = 'comments.json';
$commentsData = []; // Default empty array

if (file_exists($commentsFile) && is_readable($commentsFile)) {
    $jsonContent = file_get_contents($commentsFile);
    if ($jsonContent !== false) {
        $decodedData = json_decode($jsonContent, true);
        if (is_array($decodedData)) {
            $commentsData = $decodedData;
        }
    }
}

// Shuffle and pick exactly 10 (or fewer if not enough)
shuffle($commentsData);
$randomComments = array_slice($commentsData, 0, 10); // Always 10 or less

header('Content-Type: application/json');
echo json_encode($randomComments);
?>