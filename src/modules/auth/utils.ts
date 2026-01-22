/* eslint-disable @typescript-eslint/no-explicit-any */
import jwt from "jsonwebtoken";

export const createToken = (
  jwtPayload: { email: string; role: string },
  secretKey: string,
  expiresIn: string
) => {
  return jwt.sign(jwtPayload, secretKey, {
    expiresIn: expiresIn as any,
  });
};

