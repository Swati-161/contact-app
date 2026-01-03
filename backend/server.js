const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const app = express();

// 1. Detailed CORS Debugging
app.use(cors({
  origin: '*',
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  optionsSuccessStatus: 200 
}));

app.use(express.json());

// 2. Request Logger (Shows every hit in the terminal)
app.use((req, res, next) => {
  console.log(`[${new Date().toLocaleTimeString()}] ${req.method} request to ${req.url}`);
  next();
});

// Routes
app.use('/api/contacts', require('./routes/contacts'));

const PORT = process.env.PORT || 5001;
const uri = process.env.MONGO_URI;

// 3. Database Connection with detailed error handling
mongoose.connect(uri)
  .then(() => {
    console.log("✅ SUCCESS: Connected to MongoDB Atlas");
    
    // 4. IMPORTANT: Start the server ONLY after DB connects
    const server = app.listen(PORT, () => {
      console.log(`🚀 SERVER LIVE: http://localhost:${PORT}`);
      console.log(`🔗 TEST LINK: http://localhost:${PORT}/api/contacts/test-connection`);
    });

    // Handle port errors (like if 5001 is somehow busy)
    server.on('error', (e) => {
      if (e.code === 'EADDRINUSE') {
        console.error(`❌ ERROR: Port ${PORT} is already in use! Try changing PORT to 5002.`);
      } else {
        console.error("❌ SERVER ERROR:", e);
      }
    });

  })
  .catch(err => {
    console.error("❌ DATABASE CONNECTION ERROR:");
    console.error(err.message);
    if (err.message.includes('IP not whitelisted')) {
      console.log("👉 ACTION REQUIRED: Go to Atlas > Network Access > Add Current IP Address");
    }
  });