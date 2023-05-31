import findByUsername from '../services/userNamePass.js';

function login(req, res) {
  const user = findByUsername(req.body.username, req.body.password); // Assuming findByUsername is a function that retrieves user data
  if (user != null) {
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send(user);
  } else {
    res.status(404).send('Invalid username and/or password');
  }
}

export default {
  login
};
