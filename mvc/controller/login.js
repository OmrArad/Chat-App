import { getValidatedUserPass, generateUserToken} from '../services/login.js';

function login(req, res) {
  try {
    const user = getValidatedUserPass(req.body.username, req.body.password); // Assuming findByUsername is a function that retrieves user data
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.status(200).send(generateUserToken(user));
  } catch (error) {
    res.status(404).send('Invalid username and/or password');
  }
}

function isLoggedIn(req, res, next) {
  if (req.cookies.token) {
    next();
  } else {
    res.status(401).send("Unauthorized").redirect('/api/Tokens');
  }
}

export default {
  login,
  isLoggedIn,
};
