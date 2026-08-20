import SessionModel from "@models/session.model.js";
import type { Session, UserDocument } from "src/types.js";

export const createSession = async (userId: string, userAgent: string) => {
  const session = await SessionModel.create({ user: userId, userAgent });

  return session.toJSON();
};

export const findSessions = async (query: {
  user: UserDocument["_id"];
  valid: boolean;
}) => {
  const session = await SessionModel.find(query).lean();

  return session;
};
