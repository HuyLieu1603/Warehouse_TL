import * as dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();

//generate token
export const handleGenerateToken = async ({
  payload,
  secretkey = process.env.SECRET_KEY,
  expiresIn = "1d",
}) => {
  const token = jwt.sign(payload, secretkey, { expiresIn });
  return token;
};

//verity token
export const handleVerifyToken = async ({
  token,
  secretkey = process.env.SECRET_KEY,
}) => {
  const decoded = jwt.verify(token, secretkey);
  return decoded;
};
