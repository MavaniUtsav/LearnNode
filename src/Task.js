const http = require('http');
const fs = require('fs');
const url = require('url');
const path = require('path')

let server = http.createServer((request, response) => {
    let method = request.method.toLocaleLowerCase()
    let pathName = path.join(__dirname, 'data', 'taskData.json')
    let urlPath = url.parse(request.url, true)

    if (method === 'get' && urlPath.pathname === '/task/data/') {
        try {
            fs.readFile(pathName, 'utf-8', (err, data) => {
                if (err) {
                    response.writeHead(500, { 'Content-Type': 'application/json' })
                    response.end(JSON.stringify({ message: 'Internal server error' }))
                    // throw err
                } else {
                    const newData = JSON.parse(data).map((institute) => {
                        // console.log(v)
                        let arrOne = []
                        institute.seat.forEach((v, i) => {
                            arr = Object.entries(v).filter((v) => v[1] > 0)
                        })
                        // institute.seat = Object.fromEntries(arr);
                        // console.log(institute.seat);
                        arrOne.push(Object.fromEntries(arr))
                        institute.seat = arrOne
                        return institute
                    })

                    response.writeHead(200, { 'Content-Type': 'application/json' })
                    response.end(JSON.stringify(newData))
                }
            })
        } catch (error) {

            response.writeHead(500, { 'Content-Type': 'application/json' })
            response.end(JSON.stringify({ message: 'Internal server error' }))
            // console.log(error);
        }
    } else if (method === 'post' && urlPath.pathname === '/task/data/') {
        try {
            fs.readFile(pathName, 'utf-8', (err, data) => {
                if (err) {
                    response.writeHead(500, { 'Content-Type': 'application/json' })
                    response.end(JSON.stringify({ message: 'Internal server error - Read File' }))
                } else {
                    let body = '';
                    let fileData = JSON.parse(data)

                    request.on('data', (chunk) => {
                        body += chunk
                    })

                    request.on('end', () => {
                        // console.log(JSON.parse(body).seat)
                        let arr = []
                        Object.values(JSON.parse(body).seat).map((v) => {
                            if (!v) {
                                arr.push(false)
                            }
                        })

                        // console.log(arr.length, Object.keys(JSON.parse(body).seat).length);
                        if (arr.length !== Object.keys(JSON.parse(body).seat).length) {
                            fileData.push(JSON.parse(body))

                            fs.writeFile(pathName, JSON.stringify(fileData), (err) => {
                                response.writeHead(500, { 'Content-Type': 'application/json' })
                                response.end(JSON.stringify({ message: 'Data Added Successfully!' }))
                            })
                        } else {
                            response.writeHead(400, { 'Content-Type': 'application/json' })
                            response.end(JSON.stringify({ message: 'Institutes all seat are 0' }))
                        }
                    })
                }
            })
        } catch (error) {
            response.writeHead(500, { 'Content-Type': 'application/json' })
            response.end(JSON.stringify({ message: 'error' }))
        }
    } else if (method === 'put' && urlPath.pathname === '/task/data/') {
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
                            
                            fs.writeFile(pathName, JSON.stringify(fileData), (err) => {
                                if (err) {
                                    response.writeHead(404, { 'Content-Type': 'application/json' })
                                    response.end(JSON.stringify({ message: 'Internal server error - Data not found' }))
                                } else {
                                    response.writeHead(200, { 'Content-Type': 'application/json' })
                                    response.end(JSON.stringify({ message: 'Data Updated!!' }))
                                }
                            })
                        } else {
                            response.writeHead(404, { 'Content-Type': 'application/json' })
                            response.end(JSON.stringify({ message: 'Data not found' }))
                        }
                    }
                })
            }
        })

    } else if (method === 'delete' && urlPath.pathname === '/task/data/') {
        let urlId = JSON.parse(urlPath.query.id)

        if (!isNaN(urlId)) {
            fs.readFile(pathName, 'utf-8', (err, data) => {
                if (err) {
                    response.writeHead(404, { 'Content-Type': 'application/json' })
                    response.end(JSON.stringify({ message: 'File not found' }))
                } else {
                    let taskList = JSON.parse(data).filter((value) => value.id != urlId)

                    fs.writeFile(pathName, JSON.stringify(taskList), (err) => {
                        if (err) {
                            response.writeHead(404, { 'Content-Type': 'application/json' })
                            response.end(JSON.stringify({ message: 'Data not found' }))
                        } else {
                            response.writeHead(200, { 'Content-Type': 'application/json' })
                            response.end({ message: `Task with id ${urlId} has been deleted` })
                        }
                    })
                }
            })
        }
    }
})

server.listen(3000, () => {
    console.log("Server start at port 3000")
})

