const express = require('express');
const http = require('http');
const socketIO = require('socket.io');

const port = 8080;

const app = express();

const server = http.createServer(app);

const io = socketIO(server);

io.on('connection',socket =>{
    console.log('User connected');

    socket.on('change color',(color)=>{
    // once we get a 'change color' event from one of our clients,
    // we will send it to the rest of the clients
    // we make use of the socket.emit method again
    // with the argument given to use from the callback function above

        console.log('Color changed to : ',color);
        io.sockets.emit('change color',color);
    });

    socket.on('change heading',(heading)=>{
        console.log('heading changed to : ',heading);
        io.sockets.emit('change heading',heading);
    });

    socket.on('disconnect',()=>{
        console.log('user disconnected');
    });

});

server.listen(port,()=>console.log(`listening on port ${port}`));

