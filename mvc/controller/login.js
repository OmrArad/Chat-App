import userNamePass from '../services/userNamePass.js';
import Login from '../services/login.js';

export async function login(req, res) {
  try {
    const token = await userNamePass.
    getUserToLogin(req.body.username, req.body.password);
    res.setHeader('Content-Type', 'text/plain; charset=utf-8');
    res.setHeader('Access-Control-Allow-Origin', '*');
    // Return the token to the browser
    await res.status(200).send(token);
  } catch (error) {
    res.status(404).send('Invalid username and/or password');
  }
}

export async function isLoggedIn(req, res, next) {
  if (req.headers.authorization) {
    // Extract the token from that header
    const token = req.headers.authorization.split(" ")[1];
    try {
      // Verify the token is valid
      let data = await Login.decode(token);
      if (data.username) {
        // Token validation was successful. Continue to the actual function (index)
        res.locals.user = data;
        res.locals.authenticated = true;
        return next()
      }
       
      else
        throw new Error;
    } catch (err) {
      // UnAuthorized
      res.setHeader("content-length", 0)
      res.setHeader("date", Date.now().toString())
      res.setHeader("server", "Kestrel")
      res.setHeader("www-authenticate", "Bearer error=" + err.message)
      res.status(401).send('Invalid token');
    }
  } else {
    return res.status(403).send('Token required');
  }
}

export default {
  login,
  isLoggedIn
};