import mongoose from 'mongoose';
import User from '../model/user.js';


const fetchUserDetails = async (username) => {
  const userDetails = await User.findOne({ username });
    try {
      return {
        username: userDetails.username,
        displayName: userDetails.displayName,
        profilePic: userDetails.profilePic
      };
    } catch (error) {
      console.error('Error fetching user details:', error);
      throw error;
    }
};


export default {
    fetchUserDetails,
};