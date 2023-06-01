import jwt from 'jsonwebtoken';
const crypto = require("crypto");
import { getUserPass } from "./userPass.js";

// Generate a secret key
const secretKey = crypto.randomBytes(32).toString("hex");

const getValidatedUserPass = (username, password) => {
  let userPass;
  try {
    userPass = getUserPass(username);
  } catch (error) {
    throw new Error(error.message);
  }
  if (password === userPass.password) {
    return userPass
  } else {
    throw new Error("Invalid password");
  }
}

const generateUserToken = async (username) => {
  const payload = { username };
  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
  return token;
}

const verifyUserToken = async (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    return null;
  }
};

export {
  generateUserToken,
  verifyUserToken,
  getValidatedUserPass
};
