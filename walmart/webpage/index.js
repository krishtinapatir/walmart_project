
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










