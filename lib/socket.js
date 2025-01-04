const { Server } = require('socket.io');
const http = require('http');
const express = require('express');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: [
            'http://localhost:4200',
            'https://sakiri.netlify.app',
            'https://sakiri1.netlify.app',
        ],
        credentials: true,
    },
});

module.exports = { app, server, io };