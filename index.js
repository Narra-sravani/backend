const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const http = require('http');

const port = process.env.PORT || 3001;
const server = http.createServer(app);

const mongourl = "mongodb+srv://sravanin:6CD7lsWENPOFK5XP@bmc.fhum51y.mongodb.net/bmc";

mongoose.connect(mongourl)
  .then(async () => {
    console.log("Connected to MongoDB");

    try {
      const db = mongoose.connection;
      const collection = db.collection('users');
      const result = await collection.insertOne({ key: "value" });
      console.log("Inserted document with _id:", result.insertedId);
    } catch (error) {
      console.error("Error inserting document:", error);
    }

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

app.post('/post-data', (req, res) => {
  const { data } = req.body;
  console.log('Received data:',data);
  res.json({ message: 'Data received successfully' });
});

