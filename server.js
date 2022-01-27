// PACKAGES
require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose');
const morgan = require('morgan');
const http = require('http');
const { Socket, Server } = require("socket.io");

const PORT = process.env.PORT || 8080; 
const server = http.createServer(app);
const io = new Server(server, {
    cors:{
        origin:"*"
    },
});

const routes = require('./routes/api');

const MONGODB_URI = process.env.URI; 

// Connecting Database
mongoose.connect(MONGODB_URI,{
    useNewUrlParser:true,
    useUnifiedTopology:true
});

mongoose.connection.on('connected', () => {
    console.log('mongoose connected');
})


// Data Parsing
app.use(express.json());
app.use(express.urlencoded({extended:false}));


// HTTP req logger
app.use(morgan('tiny'));
app.use('/', routes);


server.listen(PORT, console.log(`Server is up and running at port ${PORT}`));


// Socket.io namespaces
io.on("connection", (socket) => {
    console.log(socket.id, " just connected");
    socket.on ("disconnect", (reason) =>{
        console.log(socket.id, " just disconnected due to ",reason);
    })
    socket.on ("dummy", (data) =>  {
        console.log(data);
    })
    socket.on("pointsC", (data) => {
        socket.broadcast.emit("pointsS", data);
    })
    socket.on("switchTurnC", (data) => {
        socket.broadcast.emit("switchTurnS",data);
    })
    socket.on("custom_event", (data) => {
        console.log(data);
    });
    socket.on("timeoutC", ()=>{
        console.log("timeouttt");
        socket.emit("timeoutS",);
    })
    socket.on("nameOneC", (data)=>{
        
            console.log(data);
            socket.broadcast.emit("nameOneS",data);
        
    })
    socket.on("custom", (res) => {
        console.log(res);
        socket.emit("custom2", res);
    })

    socket.on("joinRoom", (data) => {
        // console.log(data + data.roomName);
        const clients = io.sockets.adapter.rooms.get(data.roomName);
        if(clients===undefined || clients.size<2){
            
            if(clients===undefined){
                let a = data.Name;
                let b = true;
                // this is player1 make the edits corresponding to that one ! 
                console.log("player1");
                socket.join(data.roomName);
                io.in(data.roomName).emit("newUser",{a, b});
            }
            else if(clients.size===1) {
                let a = data.Name;
                let b = false;
                console.log("didjoin");
                socket.join(data.roomName);
                io.in(data.roomName).emit("newUser2",{a, b});
                io.emit("joinFlag", (data.roomName));
            }
            
        }
        else{
            let dummyID = socket.id;
            let dummyRoom = data.roomName;
            console.log(socket.id);
            io.emit("roomFull", {dummyID,dummyRoom})
            // broadcast to specific id a message that says the room is full then emit 
            // that message on client side to redirect
        }
    })
});
 


// //Post Data

// const data = {
//     questionid: 1,
//     question: 'NAME A FRUIT',
//     answer1: 'APPLE',
//     points1: 30,
//     answer2: 'BANANA',
//     points2: 22,
//     answer3: 'STRAWBERRY',
//     points3: 16,
//     answer4: 'ORANGE',
//     points4: 12,
//     answer5: 'CHERRY',
//     points5: 11,
//     answer6: 'PLUM',
//     points6: 9
// };

// const newQuestion = new questions(data);

// newQuestion.save((error)=>{
//     if(error){
//         console.log('couldnt pass data to database');
//     }
//     else{
//         console.log('data saved to db');
//     }
// });
