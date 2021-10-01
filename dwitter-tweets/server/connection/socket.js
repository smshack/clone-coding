const { Server } = require('socket.io');
const jwt = require('jsonwebtoken');
const { config } = require('../config');

class Socket {
  constructor(server) {
    this.io = new Server(server, {
      cors: {
        origin: '*',
      },
    });

    this.io.use((socket, next) => {
      const token = socket.handshake.auth.token;
      if (!token) {
        return next(new Error('Authentication error'));
      }
      jwt.verify(token, config.jwt.secretKey, (error, decode) => {
        if (error) {
          return next(new Error('Authentication error'));
        }
        next();
      });
    });
    this.io.on('connection', (socket) => {
      console.log('Socket Client connected');
    });
  }
}

let socket;
const initSocket = (server) => {
  if (!socket) {
    socket = new Socket(server);
  }
};
const gettSocketIO = () => {
  if (!socket) {
    throw new Error('Please call init first');
  }
  return socket.io;
};

module.exports.initSocket = initSocket;
module.exports.gettSocketIO = gettSocketIO;
