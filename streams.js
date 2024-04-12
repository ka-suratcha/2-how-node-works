const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {

    // SOLUTION 1
    //node load the entire file into memory, when ready, it can send data
    fs.readFile('test-file.txt', (err, data) => {
        if (err) console.log(err);
        res.end(data);
    })
})

server.listen(8000, '127.0.0.1', () => {
    console.log("Lisntening...");
})