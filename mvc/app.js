import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import routerLogin from './routes/login.js';
import routerUser from './routes/user.js';
import routerChat from './routes/chat.js';
import connection from './db.js'

const server = express();

connection();

server.use(express.static('public'));
server.use(express.json());
server.use(cookieParser());
server.use(bodyParser());

server.set('view engine', 'ejs');

server.use('/api/Tokens', routerLogin);
server.use('/api/Users', routerUser);
server.use('/api/Chats', routerChat);

server.listen(5000);
