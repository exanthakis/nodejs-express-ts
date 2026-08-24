import SessionModel from "@models/session.model.js";
import type { Session, UserDocument } from "src/types.js";

const createSession = async (userId: string, userAgent: string) => {
  const session = await SessionModel.create({ user: userId, userAgent });

  return session.toJSON();
};

const findSessions = async (query: {
  user: UserDocument["_id"];
  valid: boolean;
}) => {
  const session = await SessionModel.find(query).lean();

  return session;
};

const updateSession = (query: Partial<Session>, update: Partial<Session>) => {
  return SessionModel.updateOne(query, update);
};

export { createSession, findSessions, updateSession };
