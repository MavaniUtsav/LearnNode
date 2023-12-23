const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path')

const server = http.createServer((request, response) => {
    const method = request.method.toLocaleLowerCase()
    const urlPath = url.parse(request.url, true)
    const pathName = path.join(__dirname, 'data', 'data.json')

    if (method === 'get' && urlPath.pathname === '/api/data/') {
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
            let Obj = {
                'a': 'hello',
                "b": 'namaste'
            }

            // for (const [key, value] of Object.entries(Obj)) {
            //     console.log(`${key}: ${value}`);
            // }
        } catch (error) {
            response.writeHead(500, { 'Content-Type': 'application/json' })
            response.end(JSON.stringify({ message: 'Internal server error' }))
            // console.log(error);
        }

    } else if (method === 'post' && urlPath.pathname === '/api/data/') {

        try {
            fs.readFile(pathName, 'utf-8', (err, data) => {
                if (err) {
                    response.writeHead(500, { 'Content-Type': 'application/json' })
                    response.end(JSON.stringify({ message: 'Internal server error' }))
                } else {
                    let postData = '';
                    let fileData = JSON.parse(data)

                    request.on('data', chunk => {
                        postData += chunk
                    })


                    request.on('end', chunk => {
                        console.log(postData);
                        console.log(fileData);

                        fileData.push(JSON.parse(postData))

                        fs.writeFile(pathName, JSON.stringify(fileData), (err) => {
                            if (err) {
                                response.writeHead(500, { 'Content-Type': 'application/json' })
                                response.end(JSON.stringify({ message: 'Internal server error' }))
                            } else {
                                console.log('File Added!!');
                            }
                        })
                    })
                }
            })

        } catch (error) {
            response.writeHead(500, { 'Content-Type': 'application/json' })
            response.end(JSON.stringify({ message: 'error' }))
        }

    } else if (method === 'put' && urlPath.pathname === '/api/data/') {
        let bodyData = '';

        request.on('data', (chunk) => {
            bodyData += chunk
        })

        request.on('end', () => {
            let urlId = JSON.parse(urlPath.query.id)

            if (!isNaN(urlId)) {
                fs.readFile(pathName, 'utf-8', (err, data) => {
                    if (err) {
                        response.writeHead(404, { 'Content-Type': 'application/json' })
                        response.end(JSON.stringify({ message: 'File not found' }))
                    } else {
                        let fileData = JSON.parse(data)
                        let index = fileData.findIndex((v) => v.id === urlId)

                        if (index !== -1) {
                            fileData[index] = JSON.parse(bodyData)

                            try {
                                fs.writeFile(pathName, JSON.stringify(fileData), (err) => {
                                    if (err) throw err

                                    response.writeHead(200, { 'Content-Type': 'application/json' })
                                    response.end(JSON.stringify({ message: 'Data Updated!!' }))
                                })
                            } catch (error) {
                                response.writeHead(500, { 'Content-Type': 'application/json' })
                                response.end(JSON.stringify({ message: 'Internal server error' }))
                            }

                        } else {
                            response.writeHead(404, { 'Content-Type': 'application/json' })
                            response.end(JSON.stringify({ message: 'Data not found' }))
                        }
                    }
                })
            } else {
                response.writeHead(500, { 'Content-Type': 'application/json' })
                response.end(JSON.stringify({ message: 'Internal server error' }))
            }
        })
    } else if (method === 'delete' && urlPath.pathname === '/api/data/') {
        let urlId = JSON.parse(urlPath.query.id)

        if (!isNaN(urlId)) {
            fs.readFile(pathName, 'utf-8', (err, data) => {
                if (err) {
                    response.writeHead(404, { 'Content-Type': 'application/json' })
                    response.end(JSON.stringify({ message: 'File not found' }))
                } else {
                    let fileData = JSON.parse(data)

                    let nData = fileData.filter((v) => v.id !== urlId)

                    fs.writeFile(pathName, JSON.stringify(nData), (err) => {
                        if (err) {
                            response.writeHead(500, { 'Content-Type': 'application/json' })
                            response.end(JSON.stringify({ message: 'Internal server error' }))
                        } else {
                            response.writeHead(200, { 'Content-Type': 'application/json' })
                            response.end(JSON.stringify({ message: 'Data deleted!!' }))
                        }
                    })
                }
            })
        } else {
            response.writeHead(500, { 'Content-Type': 'application/json' })
            response.end(JSON.stringify({ message: 'Internal server error' }))
        }
    }
})

server.listen(3000, () => {
    console.log('Server start at port 3000');
})

// Object.keys(Obj) ==== Object's key no ek array return kre([key,key,key])
// Object.values(Obj) ==== Object's key ni value no ek array return kre([value,value,value])
// Object.enteries(Obj) ==== Object's key ane value bane male string na formate ma("a: somestring","b: 42")

