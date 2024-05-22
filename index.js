const { spawn} = require("node:child_process");
const http = require('http');
const path = require('path');
const batPath= path.join(__dirname, 'kek.bat')
const port = 3000;
const clientConfigStatic = require('./static-data/UpdateManifestConfig.json');

const server = http.createServer((req,res)=> {
    res.writeHead(200, {'Content-Type': 'application/json'})
    res.end(JSON.stringify(clientConfigStatic));
});

server.on("request", (req,res)=>{
    console.log(req.url)
})


server.listen(port,'0.0.0.0',async () => {
    try {
        console.log("starting leaguea del la genda");
        //Yeah so vanguard seems to block child-processes (?) from starting league client with params. so. thats fun.

        const child = spawn('cmd.exe', ['/c','start','""',batPath], {
            detached: true,
            stdio: 'ignore'
        });
        child.unref();
    } catch (e) {
        console.log(e);
    }

})
