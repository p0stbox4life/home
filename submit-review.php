<?php

if ($_SERVER["REQUEST_METHOD"] === "POST") {

  // Get form data
  $name = trim($_POST["name"]);
  $email = trim($_POST["email"]);
  $rating = (int) $_POST["rating"];
  $message = trim($_POST["message"]);

  // Validate form data
  $errors = array();

  if (empty($name)) {
    $errors[] = "Name is required";
  }

  if (empty($email)) {
    $errors[] = "Email is required";
  } else if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = "Invalid email format";
  }

  if ($rating < 1 || $rating > 5) {
    $errors[] = "Rating must be between 1 and 5";
  }

  if (empty($message)) {
    $errors[] = "Message is required";
  }

  // If there are errors, return error message
  if (!empty($errors)) {
    header("HTTP/1.1 400 Bad Request");
    echo json_encode(array("errors" => $errors));
    exit();
  }

  // Save review to file
  $filename = "reviews.txt";
  $date = date("Y-m-d H:i:s");
  $review = array(
    "name" => $name,
    "email" => $email,
    "rating" => $rating,
    "message" => $message,
    "date" => $date
  );

  $file = fopen($filename, "a");
  fwrite($file, json_encode($review) . "\n");
  fclose($file);

  // Return success message
  header("HTTP/1.1 200 OK");
  echo json_encode(array("message" => "Review submitted successfully!"));
  exit();
}
