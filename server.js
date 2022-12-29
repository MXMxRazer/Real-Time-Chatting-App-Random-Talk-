const io = require('socket.io')(3000, {
    cors: {
        origin: [
            "http://localhost:5173",
            "http://localhost:5174",
        ]
    }
});


io.on('connection', socket => {

    socket.on('join_room', data => {
        socket.join(data);
        console.log(`Socket ID: ${socket.id} joined room: ${data}`);
    })

    socket.on('send_message', second => {
        socket.to(second.roomID).emit(`receive_message`, second);
    })
})


