import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import routerLogin from './routes/login.js';
import routerUser from './routes/user.js';
import routerChat from './routes/chat.js';
import connection from './db.js';
import cors from 'cors';
import http from 'http';
import { Server } from 'socket.io';

const app = express();

connection();

app.use(express.static('public'));
app.use(express.json());
app.use(cookieParser());
app.use(bodyParser());
app.use(
  cors({
    origin: 'http://localhost:5000',
    methods: ['GET', 'POST'],
    credentials: true, // Enable credentials (cookies, authorization headers, etc)
  })
);

app.use('/api/Tokens', routerLogin);
app.use('/api/Users', routerUser);
app.use('/api/Chats', routerChat);

const httpServer = http.createServer(app);

const socketIO = new Server(httpServer, {
  cors: {
    origin: 'http://localhost:5000',
    methods: ['GET', 'POST'],
    credentials: true, // Enable credentials (cookies, authorization headers, etc)
  },
});

socketIO.on('connection', (socket) => {
  socket.on('send_message', (data) => {
    socket.broadcast.emit('receive_message', { content: data.content });
  });
});

app.listen(5000);

httpServer.listen(5001, () => {
  console.log('Server listening on port 5001');
});
