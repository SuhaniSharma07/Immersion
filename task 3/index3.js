let currentProducts = []; 

function searchProduct() {
  const query = document.getElementById("searchInput").value.trim();
  if (query === "") {
    alert("Search field cannot be empty!");
    return;
  }

  const url = `https://dummyjson.com/products/search?q=${encodeURIComponent(query)}`;
  
  fetch(url)
    .then(response => response.json())
    .then(data => {
      currentProducts = data.products;
      displayProducts(currentProducts);
    })
    .catch(error => console.error("Error fetching search results:", error));
}

function listAllProducts() {
  fetch('https://dummyjson.com/products')
    .then(response => response.json())
    .then(data => {
      currentProducts = data.products;
      displayProducts(currentProducts);
    })
    .catch(error => console.error("Error fetching product list:", error));
}

function displayProducts(products) {
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = "";

  if (products.length === 0) {
    resultsDiv.innerHTML = "<p>No products found.</p>";
    return;
  }

  products.forEach(product => {
    const productElement = document.createElement("div");
    productElement.innerHTML = `
      <h3>${product.title}</h3>
      <p>${product.description}</p>
      <p><strong>Price:</strong> $${product.price}</p>
      <p><strong>Rating:</strong> ${product.rating}</p>
      <img src="${product.thumbnail}" alt="${product.title}" />
    `;
    resultsDiv.appendChild(productElement);
  });
}

function sortProducts() {
  const sortValue = document.getElementById("sortSelect").value;
  let sortedProducts = [...currentProducts]; 

  switch (sortValue) {
    case "price-asc":
      sortedProducts.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      sortedProducts.sort((a, b) => b.price - a.price);
      break;
    case "rating-asc":
      sortedProducts.sort((a, b) => a.rating - b.rating);
      break;
    case "rating-desc":
      sortedProducts.sort((a, b) => b.rating - a.rating);
      break;
  }

  displayProducts(sortedProducts);
}