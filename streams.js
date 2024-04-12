const fs = require('fs');
const server = require('http').createServer();

server.on('request', (req, res) => {

    // SOLUTION 1
    //node load the entire file into memory, when ready, it can send data
    fs.readFile('test-file.txt', (err, data) => {
        if (err) console.log(err);
        res.end(data);
    })

    // SOLUTION 2 streams
    // read one chuck of file then send to client using write method unit entire file is readed
    // const readable = fs.createReadStream('testt-file.txt')
    // readable.on('data', chunk => {
    //     res.write(chunk);
    // })
    // readable.on('end', () => {
    //     res.end();
    // })
    // readable.on('error', err => {
    //     console.log(err);
    //     res.statusCode = 500
    //     res.end('File not found!')
    // })

    // SOLUTION 3 pipe operator
    // fix backpressure
    // pipe the output of readable stream into the impur of a writable stream
    // automatically handle speed of data going out
    const readable = fs.createReadStream('test-file.txt')
    readable.pipe(res);
    // readableSouce.pipe(writeavledest)
})

server.listen(8000, '127.0.0.1', () => {
    console.log("Lisntening...");
})