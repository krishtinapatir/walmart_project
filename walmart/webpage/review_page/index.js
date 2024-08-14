

const starRating = document.getElementById('starRating');
let selectedRating = 0;

// Load the points from local storage
function loadPoints() {
    const points = localStorage.getItem('userPoints') || 0;
    document.getElementById('pointsDisplay').textContent = `Points: ${points}`;
}

// Save reviews to localStorage
function saveReviews() {
    const reviews = [];
    document.querySelectorAll('.review-item').forEach(item => {
        const review = {
            name: item.querySelector('h3').textContent,
            rating: item.querySelectorAll('.review-rating .star.selected').length, // Get the count of selected stars
            text: item.querySelector('.review-content').textContent, // Get the review text
            imageSrc: item.querySelector('.review-image') ? item.querySelector('.review-image').src : ''
        };
        reviews.push(review);
    });
    localStorage.setItem('reviews', JSON.stringify(reviews));
}

// Load reviews from localStorage
function loadReviews() {
    const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
    const reviewList = document.getElementById('reviewList');
    reviewList.innerHTML = ''; // Clear existing reviews before loading new ones
    reviews.forEach(review => {
        const reviewItem = document.createElement('div');
        reviewItem.classList.add('review-item');

        // Add the name
        const reviewName = document.createElement('h3');
        reviewName.textContent = review.name;
        reviewItem.appendChild(reviewName);

        // Add the rating
        const reviewRating = document.createElement('div');
        reviewRating.classList.add('review-rating');
        for (let i = 0; i < review.rating; i++) {
            const star = document.createElement('span');
            star.classList.add('star', 'selected');
            star.innerHTML = '&#9733;';
            reviewRating.appendChild(star);
        }
        reviewItem.appendChild(reviewRating);

        // Add the review text
        const reviewContent = document.createElement('div');
        reviewContent.classList.add('review-content'); // Add class for identification
        reviewContent.textContent = review.text; // Set the saved review text
        reviewItem.appendChild(reviewContent);

        // Add the image if available
        if (review.imageSrc) {
            const reviewImage = document.createElement('img');
            reviewImage.classList.add('review-image');
            reviewImage.src = review.imageSrc;
            reviewItem.appendChild(reviewImage);
        }

        // Add the delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', function() {
            reviewItem.remove();
            saveReviews(); // Save reviews after deletion
        });
        reviewItem.appendChild(deleteBtn);

        // Append the review to the review list
        reviewList.appendChild(reviewItem);
    });
}

// Handle star rating selection
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

// Handle review form submission
const reviewForm = document.getElementById('reviewForm');
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
        reviewContent.classList.add('review-content'); // Add class for identification
        reviewContent.textContent = reviewText;
        reviewItem.appendChild(reviewContent);

        // Add the image if available
        if (imageFile) {
            const reviewImage = document.createElement('img');
            reviewImage.classList.add('review-image');

            const reader = new FileReader();
            reader.onload = function(e) {
                reviewImage.src = e.target.result;
                reviewItem.appendChild(reviewImage);
            };
            reader.readAsDataURL(imageFile);
        }

        // Add the delete button
        const deleteBtn = document.createElement('button');
        deleteBtn.classList.add('delete-btn');
        deleteBtn.textContent = 'Delete';
        deleteBtn.addEventListener('click', function() {
            reviewItem.remove();
            saveReviews(); // Save reviews after deletion
        });
        reviewItem.appendChild(deleteBtn);

        // Append the new review to the review list
        document.getElementById('reviewList').appendChild(reviewItem);

        // Save the review to localStorage
        saveReviews();

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


// // Save reviews to localStorage
// function saveReviews() {
//     const reviews = [];
//     document.querySelectorAll('.review-item').forEach(item => {
//         const review = {
//             name: item.querySelector('h3').textContent,
//             rating: item.querySelector('.review-rating').children.length,
//             text: item.querySelector('div').textContent,
//             imageSrc: item.querySelector('.review-image') ? item.querySelector('.review-image').src : ''
//         };
//         reviews.push(review);
//     });
//     localStorage.setItem('reviews', JSON.stringify(reviews));
// }

// // Load reviews from localStorage
// function loadReviews() {
//     const reviews = JSON.parse(localStorage.getItem('reviews')) || [];
//     reviews.forEach(review => {
//         const reviewItem = document.createElement('div');
//         reviewItem.classList.add('review-item');

//         // Add the name
//         const reviewName = document.createElement('h3');
//         reviewName.textContent = review.name;
//         reviewItem.appendChild(reviewName);

//         // Add the rating
//         const reviewRating = document.createElement('div');
//         reviewRating.classList.add('review-rating');
//         for (let i = 0; i < review.rating; i++) {
//             const star = document.createElement('span');
//             star.classList.add('star', 'selected');
//             star.innerHTML = '&#9733;';
//             reviewRating.appendChild(star);
//         }
//         reviewItem.appendChild(reviewRating);

//         // Add the review text
//         const reviewContent = document.createElement('div');
//         reviewContent.textContent = review.text;
//         reviewItem.appendChild(reviewContent);

//         // Add the image if available
//         if (review.imageSrc) {
//             const reviewImage = document.createElement('img');
//             reviewImage.classList.add('review-image');
//             reviewImage.src = review.imageSrc;
//             reviewItem.appendChild(reviewImage);
//         }

//         // Add the delete button
//         const deleteBtn = document.createElement('button');
//         deleteBtn.classList.add('delete-btn');
//         deleteBtn.textContent = 'Delete';
//         deleteBtn.addEventListener('click', function() {
//             reviewItem.remove();
//             saveReviews(); // Save reviews after deletion
//         });
//         reviewItem.appendChild(deleteBtn);

//         // Append the review to the review list
//         reviewList.appendChild(reviewItem);
//     });
// }

// // Handle star rating selection
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

// // Handle review form submission
// const reviewForm = document.getElementById('reviewForm');
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
//                 reviewItem.appendChild(reviewImage);
//             };
//             reader.readAsDataURL(imageFile);
//         }

//         // Add the delete button
//         const deleteBtn = document.createElement('button');
//         deleteBtn.classList.add('delete-btn');
//         deleteBtn.textContent = 'Delete';
//         deleteBtn.addEventListener('click', function() {
//             reviewItem.remove();
//             saveReviews(); // Save reviews after deletion
//         });
//         reviewItem.appendChild(deleteBtn);

//         // Append the new review to the review list
//         reviewList.appendChild(reviewItem);

//         // Save the review to localStorage
//         saveReviews();

//         // Update points
//         let points = parseInt(localStorage.getItem('userPoints') || '0', 10);
//         points += 10; // Add 10 points
//         localStorage.setItem('userPoints', points);

//         // Update points display
//         loadPoints();

//         // Display success message
//         displayMessage('Thank you for your review! You have earned 10 points.');

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

// Load points and reviews when the page loads
window.onload = function() {
    loadPoints();
    loadReviews();
};









