import { reIssueAccessToken } from "@services/session.service.js";
import { verifyJwt } from "@utils/jwt.utils.js";
import type { Request, Response, NextFunction } from "express";

export const deserializeUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const accessToken = req.get("authorization")?.replace(/^Bearer\s/, "") ?? "";
  const refreshToken = req.get("x-refresh");

  console.log("Authorization:", req.get("authorization"));
  console.log("Access token:", accessToken);
  console.log("Refresh token:", refreshToken);

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
