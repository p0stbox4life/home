<?php

// Read reviews from file
$filename = "reviews.txt";
$reviews = array();

if (file_exists($filename)) {
  $file = fopen($filename, "r");
  while (!feof($file)) {
    $line = trim(fgets($file));
    if ($line) {
      $review = json_decode($line, true);
      $reviews[] = $review;
    }
  }
  fclose($file);
}

// Sort reviews by date
usort($reviews, function ($a, $b) {
  return strtotime($b["date"]) - strtotime($a["date"]);
});

// Output reviews as HTML
foreach ($reviews as $review) {
  $stars = str_repeat("★", $review["rating"]) . str_repeat("☆", 5 - $review["rating"]);
  $date = date("F j, Y", strtotime($review["date"]));
  echo "<div class='review'>";
  echo "<div class='review-header'>";
  echo "<div class='review-name'>" . htmlspecialchars($review["name"]) . "</div>";
  echo "<div class='review-stars'>" . $stars . "</div>";
  echo "<div class='review-date'>" . $date . "</div>";
  echo "</div>";
  echo "<div class='review-message'>" . htmlspecialchars($review["message"]) . "</div>";
  echo "</div>";
}
