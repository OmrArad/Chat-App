import express from 'express';
import bodyParser from 'body-parser';
import cookieParser from 'cookie-parser';
import routerLogin from './routes/login.js';
import routerRegister from './routes/register.js';
import routerChat from './routes/chat.js';

const server = express();

server.use(express.static('public'));
server.use(cookieParser());
server.use(bodyParser());

server.set('view engine', 'ejs');

server.use('/', routerLogin);
server.use('/register', routerRegister);
server.use('/chat', routerChat);

server.listen(8080);
