document.addEventListener("DOMContentLoaded", function() {
    loadReviews();
    document.getElementById("review-form").addEventListener("submit", submitReview);
});

function loadReviews() {
    fetch("reviews.txt")
        .then(response => response.text())
        .then(text => {
            const reviews = text.split("\n");
            reviews.pop(); // remove last empty line
            const reviewsList = document.getElementById("reviews-list");
            reviewsList.innerHTML = "";
            reviews.forEach(review => {
                const [name, timestamp, reviewText, patches] = review.split("|");
                const li = document.createElement("li");
                const reviewHTML = `
                    <div class="review-info">
                        <span class="review-name">${name}</span>
                        <span class="review-timestamp">${formatDate(timestamp)}</span>
                    </div>
                    <div class="review-text">${reviewText}</div>
                    <div class="review-patches">${patches}</div>
                `;
                li.innerHTML = reviewHTML;
                reviewsList.appendChild(li);
            });
        })
        .catch(error => console.error(error));
}

function submitReview(event) {
    event.preventDefault();
    const name = document.getElementById("name").value;
    const review = document.getElementById("review").value;
    const patches = document.getElementById("patches").value;
    const timestamp = Math.floor(Date.now() / 1000);
    const reviewText = `${name}|${timestamp}|${review}|${patches}\n`;
    const formData = new FormData();
    formData.append("review", reviewText);
    fetch("submit-review.php", { method: "POST", body: formData })
        .then(() => {
            loadReviews();
            document.getElementById("review-form").reset();
        })
        .catch(error => console.error(error));
}

function formatDate(timestamp) {
    const date = new Date(parseInt(timestamp) * 1000);
    const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const month = monthNames[date.getMonth()];
    const day = date.getDate();
    const year = date.getFullYear();
    let hour = date.getHours();
    let minutes = date.getMinutes();
    const ampm = hour >= 12 ? 'pm' : 'am';
    hour = hour % 12 || 12;
    minutes = minutes < 10 ? '0' + minutes : minutes;
    return `${month} ${day}, ${year} at ${hour}:${minutes}${ampm}`;
}
