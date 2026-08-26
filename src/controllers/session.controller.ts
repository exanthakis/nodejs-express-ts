import {
  createSession,
  findSessions,
  updateSession,
} from "@services/session.service.js";
import { validatePassword } from "@services/user.service.js";
import { signJwt } from "@utils/jwt.utils.js";
import type { Request, Response } from "express";
import config from "config";
import jwt from "jsonwebtoken";
import type { CreateSessionInput } from "@schema/session.schema.js";
import logger from "@utils/logger.js";

export const createUserSessionHandler = async (
  req: Request<{}, {}, CreateSessionInput["body"]>,
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

export const getUserSessionHandler = async (_req: Request, res: Response) => {
  const userId = res.locals.user._id;

  try {
    const sessions = await findSessions({ user: userId, valid: true });
    return res.status(200).send(sessions);
  } catch (e: unknown) {
    logger.error(e);
    return res.status(409).send(e instanceof Error ? e?.message : "");
  }
};

export const deleteSessionHandler = async (_req: Request, res: Response) => {
  const sessionId = res.locals.user.session;

  await updateSession({ _id: sessionId }, { valid: false });

  return res.send({
    accessToken: null,
    refreshToken: null,
  });
};
