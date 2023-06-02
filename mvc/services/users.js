const mongoose = require('mongoose');
import { User } from '../model/user.js';



const fetchUserDetails = async (username) => {
    try {
      const userDetails = await User.findOne({ username });
      return {
        displayName: userDetails.displayName,
        username: userDetails.username,
        profilePicture: userDetails.profilePicture
      };
    } catch (error) {
      console.error('Error fetching user details:', error);
      throw error;
    }
};

export default {
    fetchUserDetails,
};