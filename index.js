const express = require('express');
const app = express();
const http = require('http');

const port = process.env.PORT || 3001;
const server = http.createServer((req, res) => {
  res.statusCode = 200;
  res.end('Hello bookmychef');
});

app.get('/data', (req, res) => {
    res.end({ message: 'Hello from Node.js!' });
  });
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
