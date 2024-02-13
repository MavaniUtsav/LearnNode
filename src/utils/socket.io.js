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
        console.log(`User connected: ${socket.id}`);

        // Handle incoming messages from the client
        socket.on('message', (message) => {
            console.log(`Received message from ${socket.id}: ${message}`);
        });

        socket.on("text", (obj) => {
            io.to(obj.chatId).emit('message', obj.message);
        })

        socket.on('join_group', (groupId) => {
            socket.join(groupId);
        })

        // Handle disconnection
        socket.on('disconnect', () => {
            console.log(`User disconnected: ${socket.id}`); 
        });
    });

    io.listen(4000);
}

module.exports = connetcSocket

