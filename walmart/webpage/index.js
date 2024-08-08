
let products = [];

// Load the JSON data
fetch('walmart.json')
    .then(response => response.json())
    .then(data => {
        products = data;
    })
    .catch(error => {
        console.error('Error loading JSON data:', error);
    });

function searchProduct() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const results = products.filter(product =>
        product["product_name"].toLowerCase().includes(query) // Adjust key if necessary
    );

    displayResults(results);
}

function displayResults(results) {
    const productDetails = document.getElementById('product-details');
    productDetails.innerHTML = '';

    if (results.length === 0) {
        productDetails.innerHTML = '<p>No products found.</p>';
        return;
    }

    results.forEach(product => {
        const productHTML = `
            <div class="product-item">
                <img src="${product['image_url']}" alt="${product['product_name']}" />
                <h3>${product['product_name']}</h3>
                <p>${product['price_desciption']}</p>
                <p>Rating: ${product['rating']}</p>
                <a href="${product['URL']}" target="_blank">View Product</a>
                  <p>Available: ${product['gray 3']}</p>
            </div>
        `;
        productDetails.innerHTML += productHTML;
    });
}

function compareProducts() {
    // Placeholder function for comparison
    // Implement comparison logic here
    console.log('Compare button clicked');
}


























// const fs = require('fs');
// const path = require('path');

// // Read JSON file
// const filePath = path.join(__dirname, 'walmart.json');
// let products = [];

// fs.readFile(filePath, 'utf8', (err, data) => {
//     if (err) {
//         console.error('Error reading JSON file:', err);
//         return;
//     }
//     products = JSON.parse(data);
//     // Now you can use `products` in your application
//     console.log(products);
// });

// // Example function to search products (you can move this to a different part of your app)
// function searchProduct(query) {
//     const results = products.filter(product =>
//         product["product_name"].toLowerCase().includes(query.toLowerCase())
//     );

//     displayResults(results);
// }

// function displayResults(results) {
//     results.forEach(product => {
//         console.log(`Name: ${product['product_name']}`);
//         console.log(`Image URL: ${product['image_url']}`);
//         console.log(`Price: ${product['price_desciption']}`);
//         console.log(`Rating: ${product['rating']}`);
//         console.log(`URL: ${product['URL']}`);
//         console.log('---');
//     });
// }

// // Example usage
// searchProduct('example'); // Replace 'example' with your search query
