$(document).ready(function() {
    loadReviews();
});

function loadReviews() {
    $.get("reviews.json", function(data) {
        var reviews = JSON.parse(data);
        reviews.sort(function(a, b) {
            return b.timestamp - a.timestamp;
        });
        var reviewsList = document.getElementById("reviews-list");
        reviewsList.innerHTML = "";
        reviews.forEach(function(review) {
            var li = document.createElement("li");
            var reviewHTML = '<div class="review-info"><span class="review-name">' + review.name + '</span><span class="review-timestamp">' + formatDate(review.timestamp) + '</span></div><div class="review-text">' + review.review + '</div><div class="review-patches">' + review.patches + '</div>';
            li.innerHTML = reviewHTML;
            reviewsList.appendChild(li);
        });
    });
}

function submitReview() {
    var name = document.getElementById("name").value;
    var review = document.getElementById("review").value;
    var patches = document.getElementById("patches").value;
    $.post("submit-review.php", { name: name, review: review, patches: patches }, function() {
        loadReviews();
        document.getElementById("name").value = "";
        document.getElementById("review").value = "";
        document.getElementById("patches").value = "";
    });
}

function formatDate(timestamp) {
    var date = new Date(timestamp * 1000);
    var monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    var month = monthNames[date.getMonth()];
    var day = date.getDate();
    var year = date.getFullYear();
    var hour = date.getHours();
    var minutes = date.getMinutes();
    var ampm = hour >= 12 ? 'pm' : 'am';
    hour = hour % 12;
    hour = hour ? hour : 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    var strTime = hour + ':' + minutes + ' ' + ampm;
    return month + ' ' + day + ', ' + year + ' at ' + strTime;
}
