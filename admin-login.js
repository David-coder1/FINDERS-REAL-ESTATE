// Admin credentials (simple static check)
const adminUsername = "admin";
const adminPassword = "admin123";

// Handle login submission
document.getElementById("login-form").addEventListener("submit", function (e) {
    e.preventDefault();

    const username = document.getElementById("username").value;
    const password = document.getElementById("password").value;

    if (username === adminUsername && password === adminPassword) {
        localStorage.setItem("adminLoggedIn", "true");
        window.location.href = "admin.html";
    } else {
        document.getElementById("error-message").textContent = "Invalid username or password.";
    }
});
