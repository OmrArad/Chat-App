import jwt from 'jsonwebtoken';
import crypto from 'crypto';
// Generate a secret key
const secretKey = crypto.randomBytes(32).toString("hex");

const tokenizer = (username) => {
  const payload = { username };
  const token = jwt.sign(payload, secretKey);
  return token;
}

const decode = (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    throw error;
  }
};

export default{ tokenizer, decode };
