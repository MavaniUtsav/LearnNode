const http = require('http')
const url = require('url')

const server = http.createServer((request, response) => {
    // console.log(request.method)
    // console.log(request.headers);
    // console.log(request.httpVersion);
    // console.log(request.url);
    // console.log(url.parse(request.url, true));

    // response.writeHead(200, {'Content-Type':'application/json'})
    // response.end('Hello World!!')
})

server.listen(3000, () => {
    console.log('Server started at port 3000');
})