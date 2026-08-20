import config from "config";
import jwt from "jsonwebtoken";

const privateKey = config
  .get<string>("accessTokenPrivateKey")
  .replace(/\\n/g, "\n");
const publicKey = config
  .get<string>("accessTokenPublicKey")
  .replace(/\\n/g, "\n");

// console.log("CONFIG privateds:", privateKey);
// console.log("CONFIG publicds:", publicKey);

export const signJwt = (
  object: Object,
  options?: jwt.SignOptions | undefined,
) => {
  return jwt.sign(object, privateKey, {
    ...(options && options),
    algorithm: "RS256",
  });
};

export const verifyJwt = (token: string) => {
  try {
    const decoded = jwt.verify(token, publicKey);
    return {
      valid: true,
      expired: false,
      decoded,
    };
  } catch (e: any) {
    return {
      valid: false,
      expired: e.message === "jwt expired",
      decoded: null,
    };
  }
};
