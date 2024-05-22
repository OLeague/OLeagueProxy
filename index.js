const RiotConfigUrl = "https://clientconfig.rpg.riotgames.com";
import express from 'express';
const app = express();
const port = 3000
import { writeRiotConfigData } from './utils.js';

//take req, route to correct riot end point, change whatever json endpoint data we want, respond to client


app.get('/api/v1/config/public', async (req, res) => {
    console.log(RiotConfigUrl + req.originalUrl)
    const riotResponse = await fetch(RiotConfigUrl + req.originalUrl);
    const riotJson = await riotResponse.json()
    res.json(riotJson);
});

app.get('/api/v1/config/player', async (req, res) => {
    console.log(RiotConfigUrl + req.originalUrl)

    const riotResponse = await fetch(RiotConfigUrl + req.originalUrl,{
        headers: req.headers
    });
    res.json(await riotResponse.json());
});

app.get('*', async (req, res) => {
    console.log(req.originalUrl)
});
app.listen(port, () => {
    console.log(`OLeague proxy server running on port: ${port}`)
})


