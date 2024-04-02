const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const http = require('http');
const Lead = require("./models/message");
const leadRoutes= require('./routes');
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

app.use('/lead',leadRoutes);

// app.post('/post-data', async (req, res) => {
//   try {
//     const data = req.body;
//     console.log('Received data:', data);
//     // Save data to MongoDB or perform any other operations here if needed

//     // Sending the received data back in the response
//     res.json(data);
//   } catch (error) {
//     console.error('Error handling data:', error);
//     res.status(500).json({ error: 'Failed to process data' });
//   }
// });
// app.post('/post-data', async (req, res) => {
//   try {
//     const data = req.body;
//     console.log('Received data:', data);
//     // No database storage, just sending back the received data
//     res.json(data);
//   } catch (error) {
//     console.error('Error handling data:', error);
//     res.status(500).json({ error: 'Failed to process data' });
//   }
// });




module.exports = app;
