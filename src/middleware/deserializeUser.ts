import type { UserLocals } from "src/types.ts";
import { reIssueAccessToken } from "../services/session.service.ts";
import { verifyJwt } from "../utils/jwt.utils.ts";
import type { Request, Response, NextFunction } from "express";

export const deserializeUser = async (
  req: Request<{}, unknown, unknown, unknown, UserLocals>,
  res: Response<{}, UserLocals>,
  next: NextFunction,
) => {
  const accessToken = req.get("authorization")?.replace(/^Bearer\s/, "") ?? "";
  const refreshToken = req.get("x-refresh");

  if (!accessToken) return next();

  const { decoded, expired } = verifyJwt(accessToken);

  if (decoded) {
    res.locals.user = decoded;
    return next();
  }

  if (expired && refreshToken) {
    const newAccessToken = await reIssueAccessToken({ refreshToken });

    if (newAccessToken) {
      res.set("x-access-token", newAccessToken);

      const result = verifyJwt(newAccessToken ?? "");

      res.locals.user = result.decoded;
    }
    return next();
  }

  return next();
};
