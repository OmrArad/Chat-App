import jwt from 'jsonwebtoken';
const crypto = require("crypto");

// Generate a secret key
const secretKey = crypto.randomBytes(32).toString("hex");

const tokenizer = async (username) => {
  const payload = { username };
  const token = jwt.sign(payload, secretKey, { expiresIn: "1h" });
  return token;
}

const decodeToken = async (token) => {
  try {
    const decoded = jwt.verify(token, secretKey);
    return decoded;
  } catch (error) {
    return null;
  }
};

export default{ tokenizer, decodeToken };
