import type { Request, Response, NextFunction } from "express";
import type { UserLocals } from "src/types.js";

export const requireUser = (
  _req: Request<{}, unknown, unknown, unknown, UserLocals>,
  res: Response<unknown, UserLocals>,
  next: NextFunction,
) => {
  const user = res.locals.user;

  if (!user) {
    return res.sendStatus(403);
  }

  return next();
};
