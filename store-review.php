<?php
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
  $name = $_POST['name'];
  $review = $_POST['review'];
  
  // Write data to text file
  $file = fopen('reviews.txt', 'a');
  fwrite($file, "$name: $review\n");
  fclose($file);
}
?>
