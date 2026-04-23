const express = require('express');
const axios = require('axios');
const cors = require('cors');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());
app.use(express.static(__dirname));

app.post('/download', async (req, res) => {
    const { url } = req.body;

    if (!url) {
        return res.status(400).json({ error: 'No URL provided' });
    }

    try {
        const response = await axios.post(
            'https://snap-video3.p.rapidapi.com/download',
            new URLSearchParams({ url: url }),
            {
                headers: {
                    'x-rapidapi-key': process.env.RAPIDAPI_KEY,
                    'x-rapidapi-host': 'snap-video3.p.rapidapi.com',
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        );

        res.json(response.data);

    } catch (error) {
        res.status(500).json({ error: 'Download failed' });
    }
});

app.listen(3000, () => {
    console.log('Server running on http://localhost:3000');
});