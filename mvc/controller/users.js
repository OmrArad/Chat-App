import createUser from '../services/userNamePass.js';

async function register(req, res) {
  const userData = req.body; // Assuming the request body contains the user registration data
  try {
    // Create a new user based on the userData
    const newUser = await createUser.create(userData);
    res.status(200).json(newUser);
  } catch (error) {
    console.error(error);
    res.status(401);
  }
}
async function fetchUserDetails(req, res) {
  const username = req.params.username; // Assuming the request body contains the user registration data
  try {
    
  }
  catch (error) {
    console.error(error);
    res.status(500).send('An error occurred during registration.');
  }

}


export default {
  register
};
