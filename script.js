// Function to display reviews on the webpage
function displayReviews() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      var response = JSON.parse(this.responseText);
      var output = "";
      for (var i = 0; i < response.length; i++) {
        output += "<div class='review'>";
        output += "<h3>" + response[i].name + "</h3>";
        output += "<h4>" + response[i].date + "</h4>";
        output += "<p>" + response[i].review + "</p>";
        output += "</div>";
      }
      document.getElementById("reviews").innerHTML = output;
    }
  };
  xhttp.open("GET", "reviews.php", true);
  xhttp.send();
}

// Function to add a new review
function addReview() {
  var name = document.getElementById("name").value;
  var review = document.getElementById("review").value;
  if (name == "" || review == "") {
    alert("Please fill in all fields.");
    return false;
  }
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4 && this.status == 200) {
      displayReviews();
      document.getElementById("name").value = "";
      document.getElementById("review").value = "";
    }
  };
  xhttp.open("POST", "add_review.php", true);
  xhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
  xhttp.send("name=" + name + "&review=" + review);
}

// Call the displayReviews function when the page is loaded
window.onload = displayReviews;
