import SessionModel from '../models/session.model.ts';
import { signJwt, verifyJwt } from '../utils/jwt.utils.ts';
import jwt from 'jsonwebtoken';
import config from '../config.ts';
import { findUser } from './user.service.ts';
import type { Session, UserDocument } from '../types.ts';

const createSession = async (userId: string, userAgent: string) => {
  const session = await SessionModel.create({ user: userId, userAgent });

  return session.toJSON();
};

const findSessions = async (query: {
  user: UserDocument['_id'];
  valid: boolean;
}) => {
  const session = await SessionModel.find(query).lean();

  return session;
};

const updateSession = async (
  query: Partial<Session>,
  update: Partial<Session>
) => {
  return SessionModel.updateOne(query, update);
};

const reIssueAccessToken = async ({
  refreshToken,
}: {
  refreshToken: string;
}) => {
  const { decoded } = verifyJwt(refreshToken);

  if (!decoded || typeof decoded === 'string' || !decoded.session) {
    return false;
  }

  const session = await SessionModel.findById(decoded.session);

  if (!session || !session.valid) return false;

  const user = await findUser({ _id: session.user });

  if (!user) return false;

  const accessToken = signJwt(
    { ...user, session: session._id },
    {
      expiresIn: config.accessTokenTtl as jwt.SignOptions['expiresIn'],
    }
  );

  return accessToken;
};
export { createSession, findSessions, updateSession, reIssueAccessToken };
