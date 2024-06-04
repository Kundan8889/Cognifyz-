const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const mongoose = require('mongoose');

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/formDB', { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected...'))
    .catch(err => console.log(err));

// Define a schema and model for form data
const formDataSchema = new mongoose.Schema({
    username: String,
    email: String,
    password: String
});

const FormData = mongoose.model('FormData', formDataSchema);

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Server-side validation middleware
function validateFormData(req, res, next) {
    const { username, email, password } = req.body;

    // Example validation
    if (!username || !email || !password) {
        return res.status(400).send("All fields are required");
    }

    next();
}

// Route to handle form submission
app.post('/submit', validateFormData, (req, res) => {
    const { username, email, password } = req.body;

    // Save the validated data to MongoDB
    const formData = new FormData({ username, email, password });
    formData.save()
        .then(() => {
            res.sendFile(path.join(__dirname, 'public', 'success.html'));
        })
        .catch(err => {
            res.status(500).send("Error saving data to database");
        });
});

// Route to serve the form HTML file
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Change the port to 3001 to avoid the EADDRINUSE error
const PORT = process.env.PORT || 3001; // Allow using environment port or default to 3001
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
