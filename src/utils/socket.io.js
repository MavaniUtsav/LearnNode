const { Server } = require("socket.io");


const connetcSocket = () => {
    const io = new Server({ 
        cors: {
            origin: '*', // change to your own domain,
            methods: ['GET', 'POST'],
            credentials: true
        }
     });

    io.on("connection", (socket) => {
        // console.log(socket.id);
        socket.emit('send-msg', 'Hello World!!')
    });

    io.listen(4000);
}

module.exports = connetcSocket

