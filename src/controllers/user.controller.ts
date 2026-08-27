import type { Request, Response } from 'express';
import logger from '../utils/logger.ts';
import { createUser } from '../services/user.service.ts';
import type { UserInput } from '../types.ts';

export const createUserHandler = async (
  req: Request<{}, {}, UserInput>,
  res: Response
) => {
  try {
    const user = await createUser(req.body);
    return res.status(201).json(user);
  } catch (e: unknown) {
    logger.error(e);
    return res.status(409).send(e instanceof Error ? e?.message : '');
  }
};
