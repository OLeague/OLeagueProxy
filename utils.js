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