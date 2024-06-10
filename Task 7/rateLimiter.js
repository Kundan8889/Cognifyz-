const rateLimiter = require('express-rate-limit');

const customLimiter = rateLimiter({
    windowMs: 30 * 1000, // 30 seconds
    max: 2, 
    message: {
        success: false,
        message: "You've exceeded the maximum number of requests. Please try again later."
    }
});

module.exports = customLimiter;
