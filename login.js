// Utility Functions
function showSection(sectionId) {
    document.querySelectorAll(".container > div").forEach((div) => div.classList.add("hidden"));
    document.getElementById(sectionId).classList.remove("hidden");
}

function showCreateAccount() {
    showSection("create-account-section");
}

function showLogin() {
    showSection("login-section");
}

function showForgotPassword() {
    showSection("forgot-password-section");
}

function showPostProperty() {
    showSection("post-property-section");
    loadGallery();
}

// Create Account
document.getElementById("create-account-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const username = document.getElementById("username").value.trim();
    const email = document.getElementById("email").value.trim();
    const password = document.getElementById("password").value.trim();
    localStorage.setItem("user", JSON.stringify({ username, email, password }));
    alert("Account created successfully!");
    showLogin();
});

// Login
document.getElementById("login-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const loginUsername = document.getElementById("login-username").value.trim();
    const loginPassword = document.getElementById("login-password").value.trim();
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.username === loginUsername && storedUser.password === loginPassword) {
        alert("Login successful!");
        showPostProperty();
    } else {
        alert("Invalid username or password!");
    }
});

// Forgot Password
document.getElementById("forgot-password-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const resetEmail = document.getElementById("reset-email").value.trim();
    const storedUser = JSON.parse(localStorage.getItem("user"));
    if (storedUser && storedUser.email === resetEmail) {
        alert("Password reset link sent to your email!");
    } else {
        alert("Email not found!");
    }
});

// Post Property
document.getElementById("property-form").addEventListener("submit", (e) => {
    e.preventDefault();
    const propertyImage = document.getElementById("property-image").files[0];

    const reader = new FileReader();

    reader.onload = () => {
        const properties = JSON.parse(localStorage.getItem("properties")) || [];
        properties.push({ image: reader.result, });
        localStorage.setItem("properties", JSON.stringify(properties));
        loadGallery();
        alert("Property posted successfully!");
    };

    if (propertyImage) reader.readAsDataURL(propertyImage);
});

// Load Gallery (with Edit and Delete buttons)
function loadGallery() {
    const gallery = document.getElementById("current-properties");
    gallery.innerHTML = ""; // Clear the gallery first to prevent duplicates
    const properties = JSON.parse(localStorage.getItem("properties")) || [];

    properties.forEach((property, index) => {
        const div = document.createElement("div");
        div.classList.add("property-item");
        div.innerHTML = `
      <div>
        <img src="${property.image}" alt="Property" style="width: 100px; height: 100px; object-fit: cover;">
       
        <button onclick="editProperty(${index})">Edit</button>
        <button onclick="deleteProperty(${index})">Delete</button>
      </div>
    `;
        gallery.appendChild(div);
    });
}

function renderProperties() {



    // Add event listeners for edit and delete buttons
    document.querySelectorAll(".edit-btn").forEach((button) => {
        button.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index");
            editProperty(index);
        });
    });

    document.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener("click", (e) => {
            const index = e.target.getAttribute("data-index");
            deleteProperty(index);
        });
    });
}


// Edit Property
function editProperty(index) {
    const properties = JSON.parse(localStorage.getItem("properties")) || [];
    const property = properties[index];

    // Populate the form with the current property data
    const imageInput = document.getElementById("property-image");
    c

    // Temporarily store the index for later update
    localStorage.setItem("editingPropertyIndex", index);

    imageInput.value = ""; // Clear current file input
    descriptionInput.value = property.description; // Set the description
    showSection("post-property-section");

    // When the user submits the edit form, update the property
    document.getElementById("property-form").onsubmit = (e) => {
        e.preventDefault();

        const newDescription = descriptionInput.value.trim();
        const newImage = imageInput.files[0];

        if (newDescription || newImage) {
            const reader = new FileReader();
            reader.onload = () => {

                properties[index].image = newImage ? reader.result : properties[index].image;

                localStorage.setItem("properties", JSON.stringify(properties));
                alert("Property updated successfully!");
                loadGallery();
            };

            if (newImage) reader.readAsDataURL(newImage);
            else {
                properties[index].description = newDescription;
                localStorage.setItem("properties", JSON.stringify(properties));
                loadGallery();
            }
        } else {
            alert("Please provide a new description or image.");
        }
    };
}

// Delete Property
function deleteProperty(index) {
    const properties = JSON.parse(localStorage.getItem("properties")) || [];
    properties.splice(index, 1); // Remove the property at the given index
    localStorage.setItem("properties", JSON.stringify(properties));
    loadGallery(); // Refresh the gallery
}

// Logout
function logout() {
    alert("Logged out successfully!");
    showLogin();
}
