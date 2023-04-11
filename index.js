const express = require('express'); 
const io = require('socket.io')(3001, {
    cors: {
        origin: [
            "http://localhost:5173",
            "http://localhost:5174",
        ]
    }
});
const cors = require('cors'); 
const bodyParser = require('body-parser'); 
const PORT = 3000; 
const Client = require('pg'); 

const app = express();

io.on('connection', socket => {
    socket.emit("server", {message: "It's from the server!"}); 

    socket.on("join_room", data => {
        socket.join(data.roomId); 

        socket.emit("joinedUserData", {user: data.messenger, room: data.roomId}); 

    })

    socket.on("send_message", (data) => {
        socket.to(data.roomID).emit('receive_message', data);   
    })

    socket.on('disconnect', () => {
        socket.disconnect(); 
    })

})

app.use(cors()); 
app.use(bodyParser.json()); 

app.post('/', (req, res) => {
    console.log(req.body); 
    console.log('Here is the post request for PORT: ' + PORT); 
    res.send({
        message: "This is the 3000 port localhost server!"
    }); 
})

app.listen(PORT, () => {
    console.log(`Listening on PORT: 3000`); 
})