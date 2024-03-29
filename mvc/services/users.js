import User from '../model/user.js';


const fetchUserDetails = async (username) => {
    try {
      const userDetails = await User.findOne({ username });
      return {
        username: userDetails.username,
        displayName: userDetails.displayName,
        profilePic: userDetails.profilePic
      };
    } catch (error) {
      console.error('Error fetching user details:', error);
      throw new Error(error.message);
    }
};

export const getUserJson = (user) => {
  return {
      username: user.username,
      displayName: user.displayName,
      profilePic: user.profilePic
  }
}

export default {
    fetchUserDetails,
    getUserJson
};