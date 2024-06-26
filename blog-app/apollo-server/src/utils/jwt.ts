import jwt, { JwtPayload, Secret } from "jsonwebtoken";

export const JWTGenerate = async (payload: JwtPayload, secret: Secret, expireTime: string) => {
  return jwt.sign(payload, secret, {
    expiresIn: expireTime,
  });
};

// verify jwt token
export const JWTVerify = async (token: string, secret: Secret) => {
  try {
    return jwt.verify(token, secret);
  } catch (error) {
    return null;
  }
};
