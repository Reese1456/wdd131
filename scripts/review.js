document.addEventListener('DOMContentLoaded', () => {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);

    const product = urlParams.get('productName');
    const rating = urlParams.get('rating');
    const date = urlParams.get('installDate');
    const review = urlParams.get('reviewText') || "No written review provided.";
    const user = urlParams.get('userName') || "Anonymous";

    const features = urlParams.getAll('features');

    document.getElementById('displayProduct').textContent = product;
    document.getElementById('displayRating').textContent = rating;
    document.getElementById('displayDate').textContent = date;
    document.getElementById('displayReview').textContent = review;
    document.getElementById('displayUser').textContent = user;

    document.getElementById('displayFeatures').textContent = 
        features.length > 0 ? features.join(', ') : "None selected";
});

document.getElementById("currentyear").textContent = new Date().getFullYear();
document.getElementById("lastModified").textContent = document.lastModified;