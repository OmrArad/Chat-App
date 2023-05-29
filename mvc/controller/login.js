import loginModel from '../models/login.js';
function login(req, res) {
  const user = loginModel.checkUsernameAndPassword(req.body.username, req.body.password);
  if (user != null) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send(user);
  } else {
    res.status(404).send('Invalid username and/or password');
  }
}

function isLoggedIn(req, res, next) {
  if (req.seesion.user != null)
    return next();
  res.redirect('/login');
}

export default {
  login
};