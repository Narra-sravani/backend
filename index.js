const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const http = require('http');
const Lead = require("./models/message");

const port = process.env.PORT || 3001;
const server = http.createServer(app);

const mongourl = "mongodb+srv://sravanin:6CD7lsWENPOFK5XP@bmc.fhum51y.mongodb.net/bmc";

mongoose.connect(mongourl)
  .then(async () => {
    console.log("Connected to MongoDB");
    server.listen(port,'0.0.0.0', () => {
      console.log(`Server running on port ${port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });

app.use(cors());
app.use(express.json()); 

app.get('/', (req, res) => {
  res.send('Hello BMC');
});

app.get('/data', (req, res) => {
  res.json({ message: 'Hello from Node.js!' });
});

app.use((req, res, next) => {
  console.log('Middleware: Request body:', req.body);
  next();
});

app.post('/post-data', async (req, res) => {
  try {
    const data = req.body;
    console.log('Received data:', data);

    const newLead = new Lead(data);
    await newLead.save();

    res.json({ message: 'Data received and stored successfully' });
  } catch (error) {
    console.error('Error storing data:', error);
    res.status(500).json({ error: 'Failed to store data' });
  }
});

module.exports = app;
