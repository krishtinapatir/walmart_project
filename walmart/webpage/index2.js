

let products = [];

// Load all JSON data files simultaneously
Promise.all([
    fetch('json_data/gadget.json').then(response => response.json()),
    fetch('json_data/mix.json').then(response => response.json()),
    fetch('json_data/makeup.json').then(response => response.json())
])
.then(dataArrays => {
    products = [].concat(...dataArrays);
    console.log('All products loaded:', products); // Debugging to check if products are loaded
})
.catch(error => {
    console.error('Error loading JSON data:', error);
});

function searchProduct() {
    const query = document.getElementById('search-input').value.toLowerCase();
    console.log('Search query:', query); // Debugging
    const results = products.filter(product =>
        product["product_name"].toLowerCase().includes(query)
    );
    console.log('Search results:', results); // Debugging

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
                <p><b>${product['price_description']}</b></p>
                <p><b>Rating:</b> ${product['rating']}</p>
                <p> <b>Available:</b> EBT Available</p>
              <button class="butn">  <a href="${product['URL']}" target="_blank">View Product</a> </button>
                <button class="btn" data-product='${JSON.stringify(product).replace(/'/g, '&#39;')}'>Add to Selection</button>
                  <button class="redirect-btn" data-url="${product['URL']}">Track Price History</button>
            </div>
        `;
        productDetails.innerHTML += productHTML;
    });

    setupEventListeners();
}


function setupEventListeners() {
    document.querySelectorAll('.product-item .btn').forEach(button => {
        button.addEventListener('click', function() {
            const product = JSON.parse(this.getAttribute('data-product'));
            addProductToSelection(product);
        });
    });

    document.querySelectorAll('.product-item .redirect-btn').forEach(button => {
        button.addEventListener('click', function() {
            const url = this.getAttribute('data-url');
            redirectToWaltrack(url);
        });
    });
}



function redirectToWaltrack(url) {
    let extractedNumber = "";

    // Assuming the URL contains the 10-digit number you want to extract
    let match = url.match(/\/(\d{9,10})\?/);

    if (match) {
        extractedNumber = match[1]; // Extract the number
    }

    if (extractedNumber) { // Check if a number was extracted
        let newUrl = `https://waltrack.net/product/${extractedNumber}?ref=search`; // Correct URL format
        window.location.href = newUrl;
    } else {
        alert("No valid product number found to redirect.");
    }
}



function compareProducts() {
    const productItems = document.querySelectorAll('.product-item');
    if (productItems.length === 0) {
        alert('No products to compare.');
        return;
    }

    let lowestPriceProduct = null;
    let lowestPrice = Infinity;

    productItems.forEach(item => {
        const priceDescription = item.querySelector('p:nth-of-type(2)').textContent;
        const price = parseFloat(priceDescription.replace(/[^0-9.-]+/g, ""));

        if (price < lowestPrice) {
            lowestPrice = price;
            lowestPriceProduct = {
                name: item.querySelector('h3').textContent,
                price: price,
                link: item.querySelector('a').href
            };
        }
    });

    if (lowestPriceProduct) {
        const comparisonTable = document.getElementById('comparison-table');
        comparisonTable.innerHTML = `
            <tr>
                <th>Product Name</th>
                <th>Lowest Price</th>
                <th>Link</th>
            </tr>
            <tr>
                <td>${lowestPriceProduct.name}</td>
                <td>${lowestPriceProduct.price}</td>
                <td><a href="${lowestPriceProduct.link}" target="_blank">View Product</a></td>
            </tr>
        `;
    } else {
        alert('Could not find the lowest price.');
    }
}

let selectedProducts = [];

function addProductToSelection(product) {
    if (selectedProducts.length < 5) { // Limit to 5 products
        selectedProducts.push(product);
        console.log('Product added to selection:', product); // Debugging
        displaySelectedProducts();
    } else {
        alert('You can only select up to 5 products.');
    }
}

function removeProductFromSelection(productName) {
    selectedProducts = selectedProducts.filter(p => p['product_name'] !== productName);
    console.log('Product removed from selection:', productName); // Debugging
    displaySelectedProducts();
}

function displaySelectedProducts() {
    const selectedProductsDiv = document.getElementById('selected-products');
    selectedProductsDiv.innerHTML = '';

    if (selectedProducts.length === 0) {
        selectedProductsDiv.innerHTML = '<p>No products selected.</p>';
        return;
    }

    selectedProducts.forEach(product => {
        const productHTML = `
            <div class="selected-product-item">
                <img src="${product['image_url']}" alt="${product['product_name']}" />
                <h3>${product['product_name']}</h3>
                <p>${product['price_description']}</p>
                <p>Rating: ${product['rating']}</p>
               <button> <p>View Product  : <a  href="${product['URL']}" target="_blank">Link</a>  </p> </button>
                 <p>Available: ${product['availability']}</p> <!-- Fixed key reference -->
            
            </div>
        `;
        selectedProductsDiv.innerHTML += productHTML;
    });

    console.log('Selected products:', selectedProducts); // Debugging
}

function showBestOption() {
    if (selectedProducts.length === 0) {
        document.getElementById('best-product-details').innerHTML = '<p>Please add products to compare.</p>';
        return;
    }

    // Define weights for price and rating
    const priceWeight = 0.4;
    const ratingWeight = 0.6;

    function calculateScore(product) {
        const price = parseFloat(product['price_description'].replace(/[^0-9.-]+/g, ""));
        const rating = parseFloat(product['rating']);
        
        // Normalize price (lower price is better)
        const normalizedPrice = 1 / (1 + price); // Inverse normalization
        // Normalize rating (higher rating is better)
        const normalizedRating = rating / 5; // Assuming a rating scale of 1 to 5

        return (normalizedPrice * priceWeight) + (normalizedRating * ratingWeight);
    }

    let bestProduct = selectedProducts[0]; 
    let highestScore = calculateScore(bestProduct);

    selectedProducts.forEach(product => {
        const score = calculateScore(product);
        console.log('Product score:', product['product_name'], score); // Debugging
        if (score > highestScore) {
            highestScore = score;
            bestProduct = product;
        }
    });

    const bestProductDetails = document.getElementById('best-product-details');
    bestProductDetails.innerHTML = `
        <div class="best-product-item">
            <img src="${bestProduct['image_url']}" alt="${bestProduct['product_name']}" />
            <h3>${bestProduct['product_name']}</h3>
            <p>${bestProduct['price_description']}</p>
            <p>Rating: ${bestProduct['rating']}</p>
            <a href="${bestProduct['URL']}" target="_blank">View Product</a>
            <p>Score: ${highestScore.toFixed(2)}</p>
        </div>
    `;
    console.log('Best product selected:', bestProduct); // Debugging
}


function showSuggestions() {
    const input = document.getElementById('search-input');
    const suggestionsContainer = document.getElementById('suggestions-container');
    const query = input.value.toLowerCase();

    suggestionsContainer.innerHTML = ''; 

    if (query.length === 0) return;

    const filteredProducts = products.filter(product =>
        product["product_name"].toLowerCase().includes(query) 
    );


     // Limit to 5 suggestions
     const limitedSuggestions = filteredProducts.slice(0, 5);

     limitedSuggestions.forEach(product => {
        const suggestionDiv = document.createElement('div');
        suggestionDiv.classList.add('autocomplete-suggestion');
        suggestionDiv.textContent = product["product_name"]; 
        suggestionDiv.onclick = () => {
            input.value = product["product_name"]; 
            suggestionsContainer.innerHTML = ''; 
            searchProduct();
        };
        suggestionsContainer.appendChild(suggestionDiv);
    });
}

function clearSuggestions() {
    document.getElementById('suggestions-container').innerHTML = '';
}

// Add event listener for suggestions
document.getElementById('search-input').addEventListener('input', showSuggestions);










//----------------------- promotion 
 
