const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path')

const server = http.createServer((request, response) => {
    const method = request.method.toLocaleLowerCase()
    const urlPath = url.parse(request.url, true).pathname
    const pathName = path.join(__dirname, 'data', 'data.json')
    console.log(pathName);

    if (method === 'get' && urlPath === '/api/data/') {
        try {
            fs.readFile(pathName, 'utf-8', (err, data) => {
                if (err) {
                    response.writeHead(500, { 'Content-Type': 'application/json' })
                    response.end(JSON.stringify({ message: 'Internal server error' }))
                    // throw err
                } else {
                    response.writeHead(200, { 'Content-Type': 'application/json' })
                    response.end(JSON.stringify(data))
                }
            })
        } catch (error) {
            response.writeHead(500, { 'Content-Type': 'application/json' })
            response.end(JSON.stringify({ message: 'Internal server error' }))
            // console.log(error);
        }

    } else if (method === 'post' && urlPath === '/api/data/') {

        try {
            fs.readFile(pathName, 'utf-8', (err, data) => {
                if (err) {
                    response.writeHead(500, { 'Content-Type': 'application/json' })
                    response.end(JSON.stringify({ message: 'Internal server error' }))
                } else {
                    let postData = '';


                    request.on('data', chunk => {
                        postData += chunk
                    })
                    console.log(postData);

                    request.on('end', chunk => {
                        fs.writeFile(pathName, JSON.stringify(postData), (err) => {
                            if (err) {
                                response.writeHead(500, { 'Content-Type': 'application/json' })
                                response.end(JSON.stringify({ message: 'Internal server error' }))
                            } else {

                            }
                        })
                    })
                }
            })

        } catch (error) {
            response.writeHead(500, { 'Content-Type': 'application/json' })
            response.end(JSON.stringify({ message: 'error' }))
        }

    } else if (method === 'PUT') {

    } else if (method === 'DELETE') {

    }
})

server.listen(3000, () => {
    console.log('Server start at port 3000');
})