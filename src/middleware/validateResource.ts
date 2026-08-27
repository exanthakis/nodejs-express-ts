import type { Request, Response, NextFunction } from 'express';
import { z } from 'zod';

const validateResource =
  (schema: z.ZodType) =>
  (
    req: Request<{}, unknown, unknown, unknown>,
    res: Response<unknown>,
    next: NextFunction
  ) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      return next();
    } catch (e) {
      if (e instanceof z.ZodError) {
        return res.status(400).json({
          message: 'Validation failed',
          errors: e.issues,
        });
      }

      return res.status(500).json({
        message: 'Internal server error',
      });
    }
  };

export default validateResource;
