import getUserToLogin from '../services/userNamePass.js';
import tokenizer from '../services/jwt.js';

function login(req, res) {
  try {
    const user = getUserToLogin(req.body.username, req.body.password); // Assuming findByUsername is a function that retrieves user data
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Return the token to the browser
    res.status(200).send(tokenizer(user));
    // res.status(200).json({ token });
  } catch (error) {
    res.status(404).send('Invalid username and/or password');
  }
}

function isLoggedIn(req, res, next) {
  if (req.headers.authorizations) {
    // Extract the token from that header
    const token = req.headers.authorization.split(" ")[1];
    try {
      // Verify the token is valid
      const data = jwt.verify(token, key);
      console.log('The logged in user is: ' + data.username);
      // Token validation was successful. Continue to the actual function (index)
      return next()
    } catch (err) {
      return res.status(401).send("Invalid Token");
    }
  } else {
    return res.status(403).send('Token required');
  }
}

export default {
  login,
  isLoggedIn,
};