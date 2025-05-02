<?php
$file = 'comments.json';
$data = json_encode(["test" => "It works!"]);

if (file_put_contents($file, $data)) {
    echo "SUCCESS: File is writable and updated.";
} else {
    echo "ERROR: Cannot write to file.";
}
?>
