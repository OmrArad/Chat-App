import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import routerLogin from './routes/login.js';
import routerUser from './routes/user.js';
import routerChat from './routes/chat.js';
import connection from './db.js'
import cors from 'cors'
import http from 'http'
import {Server} from 'socket.io'

const server = express();

connection();

server.use(express.static('public'));
server.use(express.json());
server.use(cookieParser());
server.use(bodyParser());
server.use(cors());

// server.set('view engine', 'ejs');

server.use('/api/Tokens', routerLogin);
server.use('/api/Users', routerUser);
server.use('/api/Chats', routerChat);

const httpServer = http.createServer(server)

const socketIO = new Server(httpServer, {
    cors: {
        origin:'http://localhost:3000',
        methods: ['GET']
    }
});

socketIO.on('connection', (socket) => {
    socket.on('send_message', (data) => {
        console.log('message received');
        socket.emit('receive_message', {content: data.content} );
    });
});

httpServer.listen(5000);
