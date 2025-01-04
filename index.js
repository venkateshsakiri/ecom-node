const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const path = require('path');
const { app, server, io } = require('./lib/socket'); // Import the server instance
require('dotenv').config({ path: path.resolve(__dirname, '.env') });

const routes = require('./routes/routes');
const messageCntrl = require('./controllers/messageCntrl');
messageCntrl.setSocketInstance(io);

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));
app.use(cors({
    origin: [
        'http://localhost:4200',
        'https://sakiri.netlify.app',
        'https://sakiri1.netlify.app',
    ],
    credentials: true
}));

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URL, {
        serverSelectionTimeoutMS: 30000,
        socketTimeoutMS: 45000,
        ssl: true,
        retryWrites: true,
        w: 'majority',
      // Add these DNS-related options
        family: 4,  // Force IPv4
        authSource: 'admin',
       //directConnection: false
        });
        console.log('MongoDB connected successfully');
    } catch (error) {
        console.error('Connection error details:', {
            name: error.name,
            message: error.message,
            code: error.code
        });
        process.exit(1);
    }
};

// Call the connect function
connectDB();

// Error handler
mongoose.connection.on('error', err => {
    console.error('MongoDB connection error:', err);
});

// Connected handler
mongoose.connection.once('open', () => {
    console.log('MongoDB connected');
});

// Define userSocketMap to store user IDs and their corresponding socket IDs
const userSocketMap = {};

io.on('connection', (socket) => {
  console.log('A user connected');
  socket.on('registerUser', (userId) => {
    // If the user is already connected, remove the old socket ID
    for (const id in userSocketMap) {
        if (userSocketMap[id] === socket.id) {
            delete userSocketMap[id];
            console.log(`Removed old socket ID for user ${id}`);
            break;
        }
    }

    // Store the new socket ID with the user ID
    userSocketMap[userId] = socket.id;
    console.log(`User ${userId} connected with socket ID: ${socket.id}`);
    console.log('Current userSocketMap:', userSocketMap); // Log the current state of userSocketMap
  });

  socket.on('sendMessage', async (data) => {
    try {
        await messageCntrl.sendMessages(data, (response) => {
            socket.emit('receiveMessage', response); // Emit to the sender
            if (userSocketMap[data.selectedUser._id]) {
                io.to(userSocketMap[data.selectedUser._id]).emit('receiveMessage', response); // Emit to the intended recipient
            } else {
                console.log('Recipient not connected');
            }
        });
    } catch (error) {
        console.error('Error sending message:', error);
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected:', socket.id);
    // Remove the user's socket ID from the map
    for (const userId in userSocketMap) {
        if (userSocketMap[userId] === socket.id) {
            delete userSocketMap[userId];
            console.log(`User ${userId} removed from userSocketMap`);
            break;
        }
    }
  });
});

app.use("/api", routes);

// Use the server instance to listen
server.listen(8003, () => {
    console.log("Server is running on port 8003");
});