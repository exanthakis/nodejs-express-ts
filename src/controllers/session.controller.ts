import {
  createSession,
  findSessions,
  updateSession,
} from '../services/session.service.ts';
import { validatePassword } from '../services/user.service.ts';
import { signJwt } from '../utils/jwt.utils.ts';
import type { Request, Response } from 'express';
import config from '../config.ts';
import jwt from 'jsonwebtoken';
import type { CreateSessionInput } from '../schemas/session.schema.ts';
import logger from '../utils/logger.ts';
import type { Session } from 'src/types.ts';

// Request<
//   Params,
//   ResBody,
//   ReqBody,
//   ReqQuery,
//   Locals
// >
const createUserSessionHandler = async (
  req: Request<{}, {}, CreateSessionInput['body']>,
  res: Response<{ accessToken: string; refreshToken: string } | string>
) => {
  try {
    // Validate user password
    const user = await validatePassword(req.body);

    if (!user || !('_id' in user)) {
      res.status(401).send('Invalid email or password');
      return;
    }

    // Create a session
    const session = await createSession(
      String(user._id),
      req.get('user-agent') || ''
    );

    // Create JWT
    const accessToken = signJwt(
      { ...user, session: session._id },
      {
        expiresIn: config.accessTokenTtl as jwt.SignOptions['expiresIn'],
      }
    );

    // Create refresh token
    const refreshToken = signJwt(
      { ...user, session: session._id },
      {
        expiresIn: config.refreshTokenTtl as jwt.SignOptions['expiresIn'],
      }
    );

    return res.send({ accessToken, refreshToken });
  } catch (e: unknown) {
    logger.error(e);
    return res.status(409).send(e instanceof Error ? e.message : '');
  }
};

const getUserSessionHandler = async (
  _req: Request,
  res: Response<Session[] | string | undefined>
) => {
  try {
    const userId = res.locals.user._id;

    const sessions = await findSessions({
      user: userId,
      valid: true,
    });

    return res.status(200).send(sessions);
  } catch (e: unknown) {
    logger.error(e);
    return res.status(409).send(e instanceof Error ? e.message : '');
  }
};

const deleteSessionHandler = async (
  _req: Request,
  res: Response<{ accessToken: null; refreshToken: null } | string>
) => {
  try {
    const sessionId = res.locals.user.session;

    await updateSession({ _id: sessionId }, { valid: false });

    return res.send({
      accessToken: null,
      refreshToken: null,
    });
  } catch (e: unknown) {
    logger.error(e);
    return res.status(409).send(e instanceof Error ? e.message : '');
  }
};

export {
  createUserSessionHandler,
  getUserSessionHandler,
  deleteSessionHandler,
};
