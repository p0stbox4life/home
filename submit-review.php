<?php
  $name = $_POST["name"];
  $review = $_POST["review"];
  $patches = $_POST["patches"];
  $file = fopen("reviews.txt", "a");
  fwrite($file, $name . ": " . $review . " [patches: " . $patches . "]\n");
  fclose($file);
?>
