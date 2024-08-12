
// const starRating = document.getElementById('starRating');
// let selectedRating = 0;

// // Load the points from local storage
// function loadPoints() {
//     const points = localStorage.getItem('userPoints') || 0;
//     document.getElementById('pointsDisplay').textContent = `Points: ${points}`;
// }

// starRating.addEventListener('click', function(event) {
//     if (event.target.classList.contains('star')) {
//         const stars = starRating.querySelectorAll('.star');
//         selectedRating = event.target.getAttribute('data-value');
//         stars.forEach(star => {
//             if (star.getAttribute('data-value') <= selectedRating) {
//                 star.classList.add('selected');
//             } else {
//                 star.classList.remove('selected');
//             }
//         });
//     }
// });

// const reviewForm = document.getElementById('reviewForm');
// const reviewList = document.getElementById('reviewList');

// reviewForm.addEventListener('submit', function(event) {
//     event.preventDefault();

//     // Get the user's name
//     const nameInput = document.getElementById('name');
//     const userName = nameInput.value.trim();

//     // Get the review input value
//     const reviewInput = document.getElementById('review');
//     const reviewText = reviewInput.value.trim();

//     // Get the image file
//     const imageInput = document.getElementById('image');
//     const imageFile = imageInput.files[0];

//     if (userName && reviewText && selectedRating > 0) {
//         // Create a new review item element
//         const reviewItem = document.createElement('div');
//         reviewItem.classList.add('review-item');

//         // Add the name
//         const reviewName = document.createElement('h3');
//         reviewName.textContent = userName;
//         reviewItem.appendChild(reviewName);

//         // Add the rating
//         const reviewRating = document.createElement('div');
//         reviewRating.classList.add('review-rating');
//         for (let i = 0; i < selectedRating; i++) {
//             const star = document.createElement('span');
//             star.classList.add('star', 'selected');
//             star.innerHTML = '&#9733;';
//             reviewRating.appendChild(star);
//         }
//         reviewItem.appendChild(reviewRating);

//         // Add the review text
//         const reviewContent = document.createElement('div');
//         reviewContent.textContent = reviewText;
//         reviewItem.appendChild(reviewContent);

//         // Add the image if available
//         if (imageFile) {
//             const reviewImage = document.createElement('img');
//             reviewImage.classList.add('review-image');

//             const reader = new FileReader();
//             reader.onload = function(e) {
//                 reviewImage.src = e.target.result;
//             };
//             reader.readAsDataURL(imageFile);

//             reviewItem.appendChild(reviewImage);
//         }

//         // Add the delete button
//         const deleteBtn = document.createElement('button');
//         deleteBtn.classList.add('delete-btn');
//         deleteBtn.textContent = 'Delete';
//         deleteBtn.addEventListener('click', function() {
//             reviewItem.remove();
//         });
//         reviewItem.appendChild(deleteBtn);

//         // Append the new review to the review list
//         reviewList.appendChild(reviewItem);

//         // Update points
//         let points = parseInt(localStorage.getItem('userPoints') || '0', 10);
//         points += 10; // Add 10 points
//         localStorage.setItem('userPoints', points);

//         // Update points display
//         loadPoints();

//         // Clear the form inputs
//         nameInput.value = '';
//         reviewInput.value = '';
//         selectedRating = 0;
//         imageInput.value = '';
//         starRating.querySelectorAll('.star').forEach(star => {
//             star.classList.remove('selected');
//         });
//     } else {
//         alert('Please provide your name, a review, and a rating.');
//     }
// });

// // Load points when the page loads
// window.onload = loadPoints;












const starRating = document.getElementById('starRating');
let selectedRating = 0;

// Load the points from local storage
function loadPoints() {
    const points = localStorage.getItem('userPoints') || 0;
    document.getElementById('pointsDisplay').textContent = `Points: ${points}`;
}

starRating.addEventListener('click', function(event) {
    if (event.target.classList.contains('star')) {
        const stars = starRating.querySelectorAll('.star');
        selectedRating = event.target.getAttribute('data-value');
        stars.forEach(star => {
            if (star.getAttribute('data-value') <= selectedRating) {
                star.classList.add('selected');
            } else {
                star.classList.remove('selected');
            }
        });
    }
});

const reviewForm = document.getElementById('reviewForm');
const reviewList = document.getElementById('reviewList');
const pointsDisplay = document.getElementById('pointsDisplay');

reviewForm.addEventListener('submit', function(event) {
    event.preventDefault();

    // Get the user's name
    const nameInput = document.getElementById('name');
    const userName = nameInput.value.trim();

    // Get the review input value
    const reviewInput = document.getElementById('review');
    const reviewText = reviewInput.value.trim();

    // Get the image file
    const imageInput = document.getElementById('image');
    const imageFile = imageInput.files[0];

    if (userName && reviewText && selectedRating > 0) {
        // Create a new review item element
        const reviewItem = document.createElement('div');
        reviewItem.classList.add('review-item');

        // Add the name
        const reviewName = document.createElement('h3');
        reviewName.textContent = userName;
        reviewItem.appendChild(reviewName);

        // Add the rating
        const reviewRating = document.createElement('div');
        reviewRating.classList.add('review-rating');
        for (let i = 0; i < selectedRating; i++) {
            const star = document.createElement('span');
            star.classList.add('star', 'selected');
            star.innerHTML = '&#9733;';
            reviewRating.appendChild(star);
        }
        reviewItem.appendChild(reviewRating);

        // Add the review text
        const reviewContent = document.createElement('div');
        reviewContent.textContent = reviewText;
        reviewItem.appendChild(reviewContent);

        // Add the image if available
        if (imageFile) {
            const reviewImage = document.createElement('img');
            reviewImage.classList.add('review-image');

            const reader = new FileReader();
            reader.onload = function(e) {
                reviewImage.src = e.target.result;
            };
            reader.readAsDataURL(imageFile);

            reviewItem.appendChild(reviewImage);
        }

        // Add the delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', function() {
            reviewItem.remove();
        });
        reviewItem.appendChild(deleteBtn);

        // Append the new review to the review list
        reviewList.appendChild(reviewItem);

        // Update points
        let points = parseInt(localStorage.getItem('userPoints') || '0', 10);
        points += 10; // Add 10 points
        localStorage.setItem('userPoints', points);

        // Update points display
        loadPoints();

        // Display success message
        displayMessage('Thank you for your review! You have earned 10 points.');

        // Clear the form inputs
        nameInput.value = '';
        reviewInput.value = '';
        selectedRating = 0;
        imageInput.value = '';
        starRating.querySelectorAll('.star').forEach(star => {
            star.classList.remove('selected');
        });
    } else {
        alert('Please provide your name, a review, and a rating.');
    }
});

// Function to display a message
function displayMessage(message) {
    let messageDiv = document.getElementById('messageDiv');
    if (!messageDiv) {
        messageDiv = document.createElement('div');
        messageDiv.id = 'messageDiv';
        messageDiv.classList.add('message');
        document.body.insertBefore(messageDiv, document.body.firstChild);
    }
    messageDiv.textContent = message;
    setTimeout(() => {
        messageDiv.textContent = '';
    }, 5000); // Message disappears after 5 seconds
}

// Load points when the page loads
window.onload = loadPoints;
