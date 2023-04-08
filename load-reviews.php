<?php
$reviews = file('reviews.txt');
foreach ($reviews as $review) {
  echo "<li>$review</li>";
}
?>
