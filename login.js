// Handle Sign Up
document.getElementById("signup-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const username = document.getElementById("signup-username").value;
    const email = document.getElementById("signup-email").value;
    const password = document.getElementById("signup-password").value;

    const response = await fetch("/api/signup", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
    });

    if (response.ok) {
        alert("Account created successfully!");
    } else {
        alert("Error creating account. Please try again.");
    }
});

// Handle Login
document.getElementById("login-form").addEventListener("submit", async (event) => {
    event.preventDefault();
    const email = document.getElementById("login-email").value;
    const password = document.getElementById("login-password").value;

    const response = await fetch("/api/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
        alert("Login successful!");
    } else {
        alert("Invalid credentials. Please try again.");
    }
});


const express = require("express");
const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const app = express();
app.use(express.json());
const cors = require("cors");
app.use(cors());
// Connect to MongoDB
mongoose.connect("mongodb://localhost:27017/user-auth", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

// User Schema
const userSchema = new mongoose.Schema({
    username: String,
    email: { type: String, unique: true },
    password: String,
});

const User = mongoose.model("User", userSchema);

// Sign Up Route
app.post("/api/signup", async (req, res) => {
    const { username, email, password } = req.body;

    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();
        res.status(201).send("User registered!");
    } catch (error) {
        res.status(400).send("Error registering user.");
    }
});

// Login Route
app.post("/api/login", async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) return res.status(404).send("User not found.");

        const isPasswordValid = await bcrypt.compare(password, user.password);
        if (!isPasswordValid) return res.status(401).send("Invalid credentials.");

        const token = jwt.sign({ id: user._id }, "your_secret_key");
        res.status(200).json({ token });
    } catch (error) {
        res.status(500).send("Login error.");
    }
});

// Start Server
app.listen(5000, () => console.log("Server running on http://localhost:5000"));

