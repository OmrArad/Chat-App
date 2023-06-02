import jwt from 'jsonwebtoken';
import crypto from 'crypto';

// Hardcoded secret key

// there was a prooblem with the secret key, it was not working well becasue on every 
// import of the file, it was generating a new secret key, so the token was not valid
const secretKey = "your-secret-key";

const tokenizer = async (username) => {
  const payload = { username };
  const token = jwt.sign(payload, secretKey);
  return token;
};

export const decode = async (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    throw error;
  }
};

export default {
  tokenizer,
  decode,
};
