const express = require('express');
const socketio = require('socket.io');
const http = require('http');
const cors = require('cors');


const router = require('./router');
const {addUser, removeUser, getUser, getUsersInRoom} = require('./users');
// const { use } = require('./router');


const PORT = 5000;

const app = express();
// app.use((req,res,next)=> {
//     res.header('Access-Control-Allow-Origin', '*');
//     next();
// })
// app.use((req,res)=>{res.writeHead(200,{'Access-Control-Allow-Origin' : '*'})});


const server = http.createServer(app);
const io = socketio(server);


app.use(cors());
app.use(router);


io.on('connection',(socket)=>{
    console.log("connected");
    socket.on('join', ({name, room}, callback) => {
        const {error, user} = addUser({id : socket.id, name, room})
        if(error){
            return callback(error);
        }

        socket.join(user.room);

        socket.emit('message', {user: 'admin', text: `${user.name}, welcome to the room ${user.room}`} );
        socket.broadcast.to(user.room).emit('message' , {user: 'admin', text: `${user.name} has joined`});


        io.to(user.room).emit('roomData',{room: user.room , users: getUsersInRoom(user.room)});
        callback();
    });

    socket.on('sendMessage', (message, callback )=> {
        const user = getUser(socket.id);   
        io.to(user.room).emit('message', {user : user.name, text: message});
        callback();
    });

    socket.on('disconnect', ()=> {
        const user = removeUser(socket.id);

        if(user){
            io.to(user.room).emit('message', {user: 'admin', text: `${user.name} has left`});
            io.to(user.room).emit('roomData',{room: user.room , users: getUsersInRoom(user.room)});
        }

    })

});



server.listen(PORT,() => {
    console.log(`Server running at ${PORT}`);
})

