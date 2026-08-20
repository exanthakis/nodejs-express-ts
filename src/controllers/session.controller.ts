import { createSession } from "@services/session.service.js";
import { validatePassword } from "@services/user.service.js";
import { signJwt } from "@utils/jwt.utils.js";
import type { Request, Response } from "express";
import config from "config";
import jwt from "jsonwebtoken";

export const createUserSession = async (
  req: Request<
    {},
    {},
    {
      email: string;
      password: string;
    }
  >,
  res: Response,
) => {
  // Validate user password
  const user = await validatePassword(req.body);

  if (!user || !("_id" in user)) {
    res.status(401).send("Invalid email or password");
    return;
  }

  // Create a session
  const session = await createSession(
    String(user._id),
    req.get("user-agent") || "",
  );

  // Create jwt
  const accessToken = signJwt(
    { ...user, session: session._id },
    {
      expiresIn: config.get<string>(
        "accessTokenTtl",
      ) as jwt.SignOptions["expiresIn"],
    },
  );

  // Create refresh token
  const refreshToken = signJwt(
    { ...user, session: session._id },
    {
      expiresIn: config.get<string>(
        "refreshTokenTtl",
      ) as jwt.SignOptions["expiresIn"],
    },
  );

  return res.send({ accessToken, refreshToken });
};
