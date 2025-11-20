const http = require('http');
const { Server } = require('socket.io');
const app = require('./app');

const server = http.createServer(app);
const io = new Server(server);

// Socket.io
io.on('connection', (socket) => {
    console.log("Un utilisateur s'est connecté");

    socket.on('chat_message', (msg) => {
        io.emit('chat_message', msg);
    });

    socket.on('disconnect', () => {
        console.log("Utilisateur déconnecté");
    });
});

server.listen(8888, () => {
    console.log("Serveur démarré sur http://localhost:8888");
});
