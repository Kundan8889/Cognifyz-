const express = require('express');
const { getItem } = require('./controller');
const rateLimiter = require('./rateLimiter');

const router = express.Router();

router.get('/items', rateLimiter, getItem);

module.exports = router;