const axios = require('axios');

exports.getItem = async (req, res) => {
    try {
        const itemId = Math.floor(Math.random() * 21);
        const response = await axios.get(`https://fakestoreapi.com/items/${itemId}`);
        res.status(200).json({
            success: true,
            item: response.data
        });
    } catch (error) {
        res.status(500).json({
            success: false,
            error: "An error occurred while fetching the item."
        });
    }
};
