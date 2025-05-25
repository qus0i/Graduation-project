<?php
require_once 'C:/xampp/vendor/autoload.php'; 
require_once '../connection.php'; // or your DB connection

session_start();

use Cloudinary\Cloudinary;

$cloudinary = new Cloudinary([
    'cloud' => [
        'cloud_name' => 'dn8gqkmpu',
        'api_key'    => '935617689972222',
        'api_secret' => 'dqzXb7ASR5jELiJNUsyOk0fygEY',
    ],
    'url' => [
        'secure' => true
    ]
]);

if ($_SERVER['REQUEST_METHOD'] === 'POST' && isset($_FILES['photo'])) {
    $file = $_FILES['photo']['tmp_name'];

    try {
        $result = $cloudinary->uploadApi()->upload($file, [
            'folder' => 'user_uploads/', // optional
        ]);
        $imageUrl = $result['secure_url'];

        //echo "Image uploaded successfully";

        // Save to DB
        $userId = $_SESSION['user_id'];
        $query = "UPDATE users SET profile_img = '$imageUrl' WHERE id = $userId;
";
        $updateResult = mysqli_query($link, $query);

        if (mysqli_affected_rows($link) == 1) {
            $message = "✅ Image uploaded and saved successfully.";
            $messageType = 'success';
            // Optionally: redirect
            // header("Location: ALL_HTML/home.php");
            // exit();
        } else {
             $message = "⚠️ Could not update user photo in database.";
            $messageType = 'error';

        }
    } catch (Exception $e) {
        $message = "❌ Upload failed: " . htmlspecialchars($e->getMessage());
        $messageType = 'error';

    }
}
?>

<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Upload Profile Photo</title>
  <style>
    body {
      background-color: #0B0804;
      color: #E7D6C4;
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
    }

    .container {
      max-width: 500px;
      margin: 60px auto;
      padding: 30px;
      background-color: #1a1410;
      border-radius: 8px;
      box-shadow: 0 0 12px rgba(0,0,0,0.6);
      text-align: center;
    }

    h1 {
      color: #F9C172;
      margin-bottom: 20px;
    }

    input[type="file"] {
      margin: 15px 0;
      color: #E7D6C4;
    }

    button {
      background-color: #F9C172;
      color: #0B0804;
      padding: 10px 20px;
      font-weight: bold;
      border: none;
      border-radius: 4px;
      cursor: pointer;
      transition: background 0.3s ease;
    }

    button:hover {
      background-color: #e0a854;
    }

    .message {
      margin-top: 20px;
      padding: 12px;
      border-radius: 4px;
      font-size: 14px;
    }

    .message.success {
      background-color: #2a3d1a;
      border: 1px solid #4f7924;
      color: #cce8c0;
    }

    .message.error {
      background-color: #3e1f1f;
      border: 1px solid #a94442;
      color: #f2bcbc;
    }

    .message.info {
      background-color: #2c2c2c;
      border: 1px solid #888;
      color: #ccc;
    }
  </style>
</head>
<body>
  <div class="container">
    <h1>Upload Profile Image</h1>

    <form action="edit_profile.php" method="POST" enctype="multipart/form-data">
      <input type="file" name="photo" accept="image/*" required><br>
      <button type="submit">Upload</button>
    </form>

    <?php if (!empty($message)): ?>
      <div class="message <?php echo htmlspecialchars($messageType); ?>">
        <?php echo htmlspecialchars($message); ?>
      </div>
    <?php endif; ?>
  </div>
</body>
</html>





