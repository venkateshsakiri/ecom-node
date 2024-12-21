const express = require('express');
const cors = require('cors');
const app = express();
const mongoose = require('mongoose');
const path = require('path');
require('dotenv').config({ path: path.resolve(__dirname, '.env') });
const routes = require('./routes/routes');
app.use(cors({
  origin: [
    'http://localhost:4200',  // Local Angular development
    'https://sakiri.netlify.app',
    'https://sakiri1.netlify.app',  // Your Netlify domain
  ],
  credentials: true
}));
app.use(express.json({limit: '50mb'}));
app.use(express.urlencoded({limit: '50mb', extended: true}));
// mongoose.connect(process.env.MONGO_URL,{
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   serverSelectionTimeoutMS: 5000,
//   socketTimeoutMS: 45000,
// })
//   .then((res) => {
//     console.log("Db connected successfully");
//   })
//   .catch((err) => {
//     console.log("MongoDB connection error:", err.message);
//   });
// Add this before your connection attempt
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
      directConnection: false
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
const dns = require('dns').promises;

async function checkDNS() {
  try {
    // Try different DNS query types
    console.log('Checking DNS...');
    const records = await dns.resolve4('cluster0.0cvgm.mongodb.net');
    console.log('IPv4 records:', records);
  } catch (error) {
    console.log('DNS Error:', error);

    try {
      // Try SRV records
      const srvRecords = await dns.resolveSrv('cluster0.0cvgm.mongodb.net');
      console.log('SRV records:', srvRecords);
    } catch (srvError) {
      console.log('SRV DNS Error:', srvError);
    }
  }
}

// Call the DNS check before connecting
// checkDNS();
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


app.use("/api", routes);

app.listen(8003, () => {
  console.log("server is running");
});