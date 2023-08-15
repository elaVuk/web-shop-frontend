const express = require('express');
const jsonServer = require('json-server');
const path = require('path');
const cors = require('cors');
const server = express();
const router = jsonServer.router(path.join(__dirname, 'db.json'));
const middlewares = jsonServer.defaults();
const corsOptions = {
  origin: 'http://localhost:9100',
  methods: 'GET,PUT,POST,DELETE',
};
server.use(cors(corsOptions));
server.use(middlewares);
server.use(router);

server.listen(3000, () => {
  console.log('Fake API on port 3000');
});
