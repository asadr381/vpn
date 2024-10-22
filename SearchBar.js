const express = require('express');
const axios = require('axios');
const app = express();
const port = process.env.PORT || 3000; // Use PORT from environment or default to 3000

// Example: Different US-based IP addresses
const ipAddresses = [
    'http://192.0.2.1:5000', // Replace with a valid US-based IP or domain
    'http://192.0.2.2:5000', // Replace with a valid US-based IP or domain
    'http://192.0.2.3:5000'  // Replace with a valid US-based IP or domain
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
        console.error("Error fetching data:", error);
        res.status(500).send("Error fetching data");
    }
});

// Listen on the specified port
app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});
