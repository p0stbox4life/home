document.addEventListener("DOMContentLoaded", function() {
    loadReviews();
    document.getElementById("review-form").addEventListener("submit", submitReview);
});

function loadReviews() {
    fetch("reviews.txt")
        .then(response => response.json())
        .then(reviews => {
            reviews.sort((a, b) => b.timestamp - a.timestamp);
            const reviewsList = document.getElementById("reviews-list");
            reviewsList.innerHTML = "";
            reviews.forEach(review => {
                const li = document.createElement("li");
                const reviewHTML = `
                    <div class="review-info">
                        <span class="review-name">${review.name}</span>
                        <span class="review-timestamp">${formatDate(review.timestamp)}</span>
                    </div>
                    <div class="review-text">${review.review}</div>
                    <div class="review-patches">${review.patches}</div>
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
    const formData = new FormData();
    formData.append("name", name);
    formData.append("review", review);
    formData.append("patches", patches);
    formData.append("timestamp", timestamp);
    fetch("submit-review.php", { method: "POST", body: formData })
        .then(() => {
            loadReviews();
            document.getElementById("review-form").reset();
        })
        .catch(error => console.error(error));
}

function formatDate(timestamp) {
    const date = new Date(timestamp * 1000);
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
