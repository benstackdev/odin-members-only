import jwt from "jsonwebtoken";
import type { UserType } from "../types/UserType.type";

export const generateToken = (payload: UserType) => {
  const secret = process.env.JWT_SECRET;

  if (!secret) {
    console.log('Secret not found');
    return;
  };

  const token = jwt.sign(payload, secret, {
    expiresIn: '15m'
  });

  return token;
}
