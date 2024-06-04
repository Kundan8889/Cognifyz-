const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const path = require('path');

const app = express();
app.use(bodyParser.json());
app.use(cors());

let items = [];

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

// Create - POST
app.post('/api/items', (req, res) => {
  const item = req.body;
  items.push(item);
  res.status(201).send(item);
});

// Read - GET
app.get('/api/items', (req, res) => {
  res.send(items);
});

// Update - PUT
app.put('/api/items/:id', (req, res) => {
  const { id } = req.params;
  const updatedItem = req.body;
  items = items.map(item => item.id === id ? updatedItem : item);
  res.send(updatedItem);
});

// Delete - DELETE
app.delete('/api/items/:id', (req, res) => {
  const { id } = req.params;
  items = items.filter(item => item.id !== id);
  res.status(204).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
