let products = [];

// Load the JSON data
fetch('json_data/gadget.json')
    .then(response => response.json())
    .then(data => {
        products = products.concat(data); 
    })
    .catch(error => {
        console.error('Error loading gadget.json:', error);
    });

fetch('json_data/mix.json')
    .then(response => response.json())
    .then(data => {
        products = products.concat(data); 
    })
    .catch(error => {
        console.error('Error loading mix.json:', error);
    });

fetch('json_data/makeup.json')
    .then(response => response.json())
    .then(data => {
        products = products.concat(data); 
    })
    .catch(error => {
        console.error('Error loading makeup.json:', error);
    });

function searchProduct() {
    const query = document.getElementById('search-input').value.toLowerCase();
    const results = products.filter(product =>
        product["product_name"].toLowerCase().includes(query) 
    );

    displayResults(results);
    clearSuggestions();
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
                <p>${product['price_description']}</p> <!-- Fixed typo here -->
                <p>Rating: ${product['rating']}</p>
                <a href="${product['URL']}" target="_blank">View Product</a>
                <p>Available: ${product['availability']}</p> <!-- Fixed key reference -->
            </div>
        `;
        productDetails.innerHTML += productHTML;
    });
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
