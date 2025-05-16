<?php
// upload_pfp.php
// This script displays a form for users to upload a profile picture (PFP) after sign-up,
// and handles the file upload logic.

// Configuration
$uploadDir = __DIR__ . '/uploads/';
$maxFileSize = 2 * 1024 * 1024; // 2MB
$allowedTypes = ['image/jpeg', 'image/png', 'image/gif'];

$message = '';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    if (isset($_FILES['pfp']) && $_FILES['pfp']['error'] === UPLOAD_ERR_OK) {
        $fileTmp  = $_FILES['pfp']['tmp_name'];
        $fileName = basename($_FILES['pfp']['name']);
        $fileSize = $_FILES['pfp']['size'];
        $fileType = mime_content_type($fileTmp);

        // Validate type
        if (!in_array($fileType, $allowedTypes)) {
            $message = 'Invalid file type. Please upload JPG, PNG, or GIF.';
        }
        // Validate size
        elseif ($fileSize > $maxFileSize) {
            $message = 'File is too large. Maximum size is 2MB.';
        }
        else {
            // Create uploads dir if not exists
            if (!is_dir($uploadDir)) {
                mkdir($uploadDir, 0755, true);
            }
            // Generate unique filename
            $ext = pathinfo($fileName, PATHINFO_EXTENSION);
            $newName = 'pfp_' . uniqid() . '.' . $ext;
            $dest = $uploadDir . $newName;

            if (move_uploaded_file($fileTmp, $dest)) {
                // Here you would typically update the user's record in DB with $newName
                $message = 'Profile picture uploaded successfully!';
            } else {
                $message = 'Error moving uploaded file.';
            }
        }
    } else {
        $message = 'Please select a file to upload.';
    }
}
?><!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Upload Profile Picture</title>
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
</head>
<body class="bg-light">
<div class="container py-5">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card shadow-sm rounded-2xl">
                <div class="card-body">
                    <h5 class="card-title text-center mb-4">Upload Your Profile Picture</h5>

                    <?php if ($message): ?>
                        <div class="alert alert-info"><?php echo htmlspecialchars($message); ?></div>
                    <?php endif; ?>

                    <form method="post" enctype="multipart/form-data">
                        <div class="mb-3">
                            <label for="pfp" class="form-label">Choose an image (JPG, PNG, GIF)</label>
                            <input class="form-control" type="file" id="pfp" name="pfp" accept="image/*" required>
                        </div>
                        <div class="mb-3 text-center">
                            <img id="preview" src="#" alt="Preview" class="img-thumbnail d-none" style="max-width: 200px; max-height: 200px;" />
                        </div>
                        <button type="submit" class="btn btn-primary w-100">Upload</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</div>

<script>
    document.getElementById('pfp').addEventListener('change', function(event) {
        const [file] = this.files;
        if (file) {
            const preview = document.getElementById('preview');
            preview.src = URL.createObjectURL(file);
            preview.classList.remove('d-none');
        }
    });
</script>

</body>
</html>
