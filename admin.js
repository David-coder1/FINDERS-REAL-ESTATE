// Check if admin is logged in
if (!localStorage.getItem("adminLoggedIn")) {
    window.location.href = "admin-login.html"; // Redirect if not logged in
}

// Admin logout functionality
document.getElementById("logout-btn").addEventListener("click", function () {
    localStorage.removeItem("adminLoggedIn");
    window.location.href = "admin-login.html"; // Redirect to login page
});

// Retrieve properties from localStorage
let properties = JSON.parse(localStorage.getItem("properties")) || [];

// Add Property
document.getElementById('add-property-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const title = document.getElementById('property-title').value;
    const price = document.getElementById('property-price').value;
    const imageInput = document.getElementById('property-image');
    const imageFile = imageInput.files[0];

    if (imageFile) {
        const reader = new FileReader();

        reader.onloadend = function () {
            const imageData = reader.result; // Base64 string of the image
            const newProperty = { title, price, image: imageData };

            properties.push(newProperty);

            // Save properties to localStorage
            localStorage.setItem("properties", JSON.stringify(properties));

            renderAdminProperties();
            renderPublicProperties();
        }

        reader.readAsDataURL(imageFile); // Convert image file to base64 string
    }
});

// Render Properties in Admin Dashboard
function renderAdminProperties() {
    const adminList = document.getElementById('admin-property-list');
    adminList.innerHTML = '';
    properties.forEach((property, index) => {
        const card = document.createElement('div');
        card.className = 'admin-property-card';
        card.innerHTML = `
            <span>${property.title} - ${property.price}</span>
            <button onclick="deleteProperty(${index})">Delete</button>
        `;
        adminList.appendChild(card);
    });
}

// Render Properties in Public View
function renderPublicProperties() {
    const propertyGrid = document.getElementById('property-grid');
    propertyGrid.innerHTML = ''; // Clear the existing properties
    properties.forEach((property) => {
        const card = document.createElement('div');
        card.className = 'property-card';
        card.innerHTML = `
            <img src="${property.image}" alt="${property.title}">
            <h3>${property.title}</h3>
            <p>${property.price}</p>
        `;
        propertyGrid.appendChild(card);
    });
}

// Delete Property
function deleteProperty(index) {
    properties.splice(index, 1);
    // Update properties in localStorage
    localStorage.setItem("properties", JSON.stringify(properties));

    renderAdminProperties();
    renderPublicProperties();
}

// Initially render properties on page load
renderAdminProperties();
renderPublicProperties();
