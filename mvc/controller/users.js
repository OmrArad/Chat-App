import users from '../services/users.js';
import userNamePass from '../services/userNamePass.js';

export async function register(req, res) {
  const username = req.body.username // Assuming the request body contains the user registration data
  const password = req.body.password
  const displayName = req.body.displayName
  const profilePic = req.body.profilePic

  try {
    // Create a new user based on the userData
    const newUser = await userNamePass.createUser({username, password, displayName, profilePic});
    res.status(200).json(newUser);
  } catch (error) {
    console.error(error);
    // CHECK DIFFERENT CASES OF ERROR
    if (error.message === "User with the given username already exists.")
      // CONFLICT
      res.status(409).send();
    else
      // BAD REQUEST
      res.status(400).send();
  }
}
export async function fetchUserDetails(req, res) {
  const username = req.params.username; // Assuming the request body contains the user registration data
  try {
    res.status(200).json(await users.fetchUserDetails(username));
  }
  catch (error) {
    console.error(error);
    // UNAUTHORIZED
    res.status(404);
  }
}


export default {
  register,
  fetchUserDetails
};