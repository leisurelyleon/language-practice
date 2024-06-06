// Import required modules
const express = require('express');
const mongoose = require('mongoose');
const jwt = require('jsonwebtoken')
const bcrypt = require('bcrypt');

// Initialize Express app
const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect('mongodb://localhost/ecommerce_db', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('Connected to MongoDB'))
    .catch(err => console.error('Error connecting to MongoDB:', err));

// Define MongoDB schemas and models
const userSchema = new mongoose.Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    isAdmin: { type: Boolean, default: false }
});

// Define authentication middleware
const authenticateUser = (req, res, next) => {
    const token = req.header('Authorization');
    if (!token) return res.status(401).send('Access Denied');

    try {
        const decoded = jwt.verify(token, 'secret_key');
        req.user = decoded;
        next();
    } catch (error) {
        res.status(400).send('Invalid Token');
    }
};

// Routes for authentication
app.post('/api/register', async (req, res) => {
    const { username, password } = req.body;

    // Hash password
    const salt = await bycrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = new UserActivation({ username, password: hashedPassword });
    await user.save();
    res.status(201).send('User registered successfully');
});

app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user) return res.status(400).send('Invalid username or password');

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return res.status(400).send('Invalid username or password');

    const token = jwt.sign({ _id: user._id, isAdmin: user.isAdmin }, 'secret_key');
    res.header('Authorization', token).send('Login successful');
});

// Protected route example
app.get('/api/products', authenticateUser, (req, res) => {
    // Logic to fetch products from database
    res.send('List of products');
});

// Start server
const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));