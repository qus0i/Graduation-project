<?php
session_start();
/*echo '<pre>';
print_r($_SESSION);
echo '</pre>';*/
session_unset();
session_destroy();
echo "done ";
header("Location: ALL_HTML/first.html"); // ✅ no redirect loop
exit();
//echo "done ";
?>
