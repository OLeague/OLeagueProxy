
const RiotConfigUrl = "https://clientconfig.rpg.riotgames.com";
import express from 'express';
const app = express();
const port = 3000

app.use((req, res, next) => {
    console.warn("request to: ",req.originalUrl);
    next();
});


app.use('/static', express.static('public'))
//take req, route to correct riot end point, change whatever json endpoint data we want, respond to client




app.get('/api/v1/config/public', async (req, res) => {
    const riotResponse = await fetch(RiotConfigUrl + req.originalUrl);
    const riotJson = await riotResponse.json()
    if(req.query['app'] === 'Riot Client' && !req.query['namespace']){
        console.log(riotJson["keystone.client.theme.manifestByPatchline"]["default"]);
        riotJson["keystone.client.theme.manifestByPatchline"]["default"] = "http://localhost:3000/theme";
        console.log("changing theme manifest route to :",riotJson["keystone.client.theme.manifestByPatchline"]["default"]);
     }

    res.json(riotJson);
});



app.get('/theme', async (req, res) => {
    console.log("theme endpoint hit");

        const riotResponse = await fetch("https://riot-client.secure.dyn.riotcdn.net/channels/public/rccontent/theme/manifest_live.json",{
            headers: req.headers
        });

        console.log("riot called")

    const headersObj = {};
    riotResponse.headers.forEach((value, name) => {
        headersObj[name] = value;
    })
    console.log("Spoofing riot CDN headers")
         Object.keys(headersObj).forEach((key) => {
             //yeet caching
             if(key === "cache-control"){
                 headersObj[key] = "max-age=0"
             }
        res.setHeader(key, headersObj[key]);
        });
    console.log("Headers set")
    console.log("sendng response...")
    res.status(200).json({
        "login_splash_image": "static/loginPanelSplash.png"
    });

});

app.get('/api/v1/config/player', async (req, res) => {
    console.log(RiotConfigUrl + req.originalUrl)

    const riotResponse = await fetch(RiotConfigUrl + req.originalUrl,{
        headers: req.headers
    });
    res.json(await riotResponse.json());
});



app.listen(port, () => {
    console.log(`OLeague proxy server running on port: ${port}`)
})


