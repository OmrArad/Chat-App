import {findByUsername} from '../services/userNamePass.js';
import tokenizer from '../services/jwt.js';
import jwt from 'jsonwebtoken';

function login(req, res) {
  try {
    const user = findByUsername(req.body.username, req.body.password); // Assuming findByUsername is a function that retrieves user data
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send(tokenizer(user));
  } catch (error) {
    res.status(404).send('Invalid username and/or password');
  }
}

export default {
  login
};
