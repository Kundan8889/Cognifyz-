const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

// Set up EJS for templating
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

// Serve static files
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

// Routes
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'views', 'index.html'));
});

app.post('/login', (req, res) => {
    const user = req.body.username;
    const pass = req.body.password;
    if (user === "kundan" && pass === "1234") {
        // If credentials are correct, render result.ejs
        res.render('result', { username: user });
    } else {
        // If credentials are incorrect, render unauthorized.ejs
        res.render('unauthorized');
    }
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});
