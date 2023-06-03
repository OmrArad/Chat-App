import jwt from 'jsonwebtoken';
import crypto from 'crypto';
// Generate a secret key
const secretKey = crypto.randomBytes(32).toString("hex");

const tokenizer = async (username) => {
  const payload = { username };
  const token = jwt.sign(payload, secretKey);
  return token;
};

const decode = async (token) => {
  try {
    return jwt.verify(token, secretKey);
  } catch (error) {
    throw error;
  }
};

export default {
  tokenizer,
  decode,
};
