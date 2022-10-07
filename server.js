const express = require('express');
const app = express();
const http = require('http');
const {Server}= require('socket.io');
const ACTIONS = require('./src/Actions');

const server= http.createServer(app);
const io = new Server(server);

const userSocketMap={};//stored in memory RN

function getAllConnectedClients(roomId){
    //map converted to array, then array iterated
    return Array.from(io.sockets.adapter.rooms.get(roomId)||[]).map(
        (socketId) => {
            return {
                socketId,
                username:userSocketMap[socketId],
            }
        }
    )

}

io.on('connection', (socket) => {
    console.log('socket connected', socket.id);
    socket.on(ACTIONS.JOIN, ({roomId,username}) => {
        userSocketMap[socket.id]=username;
        socket.join(roomId);
        const clients= getAllConnectedClients(roomId);
        // console.log(clients);
        clients.forEach(({socketId})=>{
            io.to(socketId).emit(ACTIONS.JOINED,{
              clients,
              username,
              socketId:socket.id,
            }); //to which socket id u wanna notify, new user is added
        })
    });

    socket.on('disconnecting',()=>{
        const rooms =  [...socket.rooms];
        rooms.forEach((roomId)=>{
            socket.in(roomId).emit(ACTIONS.DISCONNECTED,{
                socketId:socket.id,
                username: userSocketMap[socket.id],
            })
        })
        delete userSocketMap[socket.id];
        socket.leave();
        
    })
})
const PORT= process.env.PORT||5000;
server.listen(PORT,() => console.log(`Listening on port ${PORT}`));
