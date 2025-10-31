const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(express.static(path.join(__dirname, 'public')));

const PORT = 3000;

io.on('connection', (socket) => {
console.log('Someone connected');

socket.on('join', (name) => {
socket.username = name;
io.emit('message', { user: 'System', text: `${name} joined the chat!` });
});

socket.on('send', (text) => {
io.emit('message', { user: socket.username, text });
});

socket.on('disconnect', () => {
if (socket.username) {
io.emit('message', { user: 'System', text: `${socket.username} left the chat.` });
}
});
});

server.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));