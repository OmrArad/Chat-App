import user from '../model/user.js';
import createUser from '../services/userNamePass.js';

export async function register(req, res) {
  const userData = req.body; // Assuming the request body contains the user registration data
  try {
    // Create a new user based on the userData
    const newUser = await createUser.create(userData);
    res.status(200).json(newUser);
  } catch (error) {
    console.error(error);
    // CONFLICT
    res.status(409);
  }
}
export async function fetchUserDetails(req, res) {
  const username = req.params.username; // Assuming the request body contains the user registration data
  try {
    res.status(200).json(await user.fetchUserDetails(username));
  }
  catch (error) {
    console.error(error);
    res.status(404);
  }
}


export default {
  register,
  fetchUserDetails
};