const express = require("express");
const app = express();
const http = require("http").createServer(app);
const io = require("socket.io")(http);

app.use(express.static("public"));

io.on("connection", (socket) => {
  console.log("Un utilisateur est connecté");

  socket.on("create or join", (room) => {
    console.log("Create or Join request to:", room);

    const myRoom = io.sockets.adapter.rooms.get(room) || { size: 0 };
    const numClients = myRoom.size;

    console.log(`Room ${room} has ${numClients} clients`);

    if (numClients === 0) {
      socket.join(room);
      socket.emit("created", room, socket.id);
    } else if (numClients === 1) {
      console.log("Client joining room");
      io.sockets.in(room).emit("join", room);
      socket.join(room);
      socket.emit("joined", room, socket.id);
      io.sockets.in(room).emit("ready"); // Dit au premier de commencer l'offre
    } else {
      // Max 2 clients pour du P2P simple
      socket.emit("full", room);
    }
  });

  // Relais des messages de signalisation (SDP, ICE Candidates)
  socket.on("message", (message) => {
    socket.broadcast.emit("message", message);
  });

  socket.on("disconnect", () => {
    console.log("Utilisateur déconnecté");
  });
});

http.listen(3000, () => {
  console.log("Serveur écoute sur http://localhost:3000");
});
