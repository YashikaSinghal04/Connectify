import { Server } from "socket.io";
import http from "http";
import express from "express";

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
       origin: ["http://localhost:3001", "http://localhost:3002", "http://localhost:3000", "http://localhost:5173",
                    "https://guileless-pixie-1032da.netlify.app"  ],
        methods: ["GET", "POST"],
        credentials: true
    }
});

// Set global.io for use in other modules
global.io = io;

export const getReceiverSocketId=(receiverId)=>{
    return users[receiverId];
}

const users={}

io.on("connection", (socket) => {
    const userId=socket.handshake.query.userId
    if(userId){
        users[userId]=socket.id
    }
    // used to send the event to all connected users
 io.emit("getOnlineUsers",Object.keys(users));

 // used to listen client side events emitted by server side
 
   
 

    socket.on("disconnect", () => {
         delete users[userId];
    io.emit("getOnlineUsers",Object.keys(users));
    });
});

export { app, server, io };
