import express from "express"
import http from "http";
import { Server } from "socket.io";
import userRoute from "./routes/user.js"
import cors from 'cors'
import 'dotenv/config' 
import mongoConnect from "./db.js";
import profileRoute from "./routes/profile.js"


const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",  // use your frontend url 
    methods: ["GET", "POST"],
  },
});


const PORT= process.env.PORT || 5000;


app.use(cors({
    origin: "http://localhost:5173", 
    methods: ["GET", "POST", "PUT", "DELETE"],
  }));

app.use(express.urlencoded({ extended: false}));
app.use(express.json());



app.use("/api/user",userRoute)
app.use("/profile",profileRoute)

mongoConnect(process.env.MONGO_URL)




const userSocketMap = {};

function getAllClients(roomId) {
  return Array.from(io.sockets.adapter.rooms.get(roomId) || []).map(

    // by defaul it return map so to convert it to an array we use Array.from()

    (socketId) => {
      return {
        socketId,
        userName: userSocketMap[socketId],
      };
    }
  );
}

io.on("connection", (socket) => {

  socket.on("join", ({ roomId, userName }) => {
    userSocketMap[socket.id] = userName;

    socket.join(roomId);

    const clients = getAllClients(roomId);

    clients.forEach(({ socketId }) => {
      io.to(socketId).emit("joined", {
        clients,
        joinedUserName: userName,
        socketId: socket.id,
      });
    });
  });

  socket.on('code_change',({roomId,code,from})=>{
    
    socket.in(roomId).emit('code_change',{ code ,from})

  })
  
  socket.on('code_sync',({code, socketId})=>{
    
    io.to(socketId).emit('code_change',{ code })

  })

  


  socket.on("disconnecting", () => {
    const room = [...socket.rooms];

    room.forEach((roomId) => {
      socket.in(roomId).emit("disconnected", {
        socketId: socket.id,
        LeavingUserName: userSocketMap[socket.id],
      });
    });

    delete userSocketMap[socket.id];
    socket.leave();
  });
});


server.listen(PORT, () => console.log(`Server started at ${PORT}`));
