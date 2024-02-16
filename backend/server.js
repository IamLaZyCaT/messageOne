const express = require('express');
const http = require('http');
const socketIo = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = socketIo(server);

const PORT = process.env.PORT || 3001;

// Enable CORS
app.use(cors());

io.on('connection', (socket) => {
  console.log('A user connected');

  // Listen for incoming messages from clients
  socket.on('message', (message) => {
    console.log('Received message:', message);

    // Broadcast the message to all connected clients
    io.emit('message', { text: message, self: false });
  });

  // Clean up on client disconnect
  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
