const express = require('express');
const helmet = require('helmet');
const cors = require('cors');

const authRouter = require('../auth/auth-jwt');
const userRouter = require('../users/user-router');
const restricted = require('../auth/restrict-middleware');  

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api/auth', authRouter);
server.use('/api/users', restricted, userRouter);

server.get('/', (req, res) => {
  res.send("It's alive!");
});

module.exports = server;