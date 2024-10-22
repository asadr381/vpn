const express = require('express');
const axios = require('axios');
const app = express();
const port = 3000;

// Example: Different IP addresses
const ipAddresses = [
    'http://192.168.1.10:5000',
    'http://192.168.1.11:5000',
    'http://192.168.1.12:5000',
];

app.get('/search', async (req, res) => {
    const query = req.query.query;
    try {
        // Send requests to different IP addresses
        const promises = ipAddresses.map(ip => axios.get(`${ip}/search?query=${query}`));
        const responses = await Promise.all(promises);

        // Collect and return results
        const data = responses.map(response => response.data);
        res.json(data.flat());
    } catch (error) {
        res.status(500).send("Error fetching data");
    }
});

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
