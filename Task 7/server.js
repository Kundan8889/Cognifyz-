// server.js
const express = require('express');
const route = require('./route');

const app = express();

// Use the item route
app.use('/', route);

const PORT = process.env.PORT || 8000;
app.listen(PORT, () => {
    console.log(`Server listening at port ${PORT}`);
});
