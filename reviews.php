<?php
  $reviews = file("reviews.txt", FILE_IGNORE_NEW_LINES);
  echo json_encode($reviews);
?>
