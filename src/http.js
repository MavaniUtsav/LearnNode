const http = require('http')
const url = require('url')
const fs = require('fs')

const server = http.createServer((request, response) => {
    console.log(request.method)
    console.log(request.headers);
    // console.log(request.httpVersion);
    // console.log(request.url);
    // console.log(url.parse(request.url, true));
    fs.readFile('./src/data/hello.html', 'utf-8', (err, data) => {
        if (err) throw err;

        response.writeHead(200, { 'Content-Type': 'application/json' })
        response.end(data)
    })
})

server.listen(3000, () => {
    console.log('Server started at port 3000');
})