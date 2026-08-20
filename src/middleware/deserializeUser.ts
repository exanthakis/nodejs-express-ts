import { verifyJwt } from "@utils/jwt.utils.js";
import type { Request, Response, NextFunction } from "express";

export const deserializeUser = (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const accessToken = req.get("authorization")?.replace(/^Bearer\s/, "") ?? "";

  if (!accessToken) return next();

  const { decoded } = verifyJwt(accessToken);

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  return next();
};
