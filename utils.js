import fs from "fs";

export async function writeRiotConfigData(filePathAndName, riotJson) {
    await fs.writeFile(filePathAndName, JSON.stringify(riotJson), (err) => {
        if (err) {
            console.error('Error writing config file:', err);
        } else {
            console.log('Config File has been written successfully.');
        }
    });
}

export async function handleFourOhFour(req, res, next){
    res.status(404);

    const protocol = req.protocol;
    const host = req.hostname;
    const url = req.originalUrl;

    const fullUrl = `${protocol}://${host}${url}`
    console.log(fullUrl, 'wtf')
    res.send('404');
}

export function logOriginalUrl (req, res, next) {
    console.log('Request URL:', req.originalUrl)
    next()
}