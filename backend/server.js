const express = require('express');
const fetch = require('node-fetch');
const { parseStringPromise } = require('xml2js');

const app = express();
const PORT = 3000;
const RSS_URL = 'https://www.lemondeinformatique.fr/rss'; // Remplacez par l'URL de votre flux RSS

app.get('/fetch-news', async (req, res) => {
    try {
        const response = await fetch(RSS_URL);
        const data = await response.text();
        
        const jsonData = await parseStringPromise(data);
        const latestNews = jsonData.rss.channel[0].item[0];

        res.json({
            title: latestNews.title[0],
            link: latestNews.link[0],
            description: latestNews.description[0]
        });
    } catch (error) {
        res.status(500).send('Error fetching news');
    }
});

app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
});
