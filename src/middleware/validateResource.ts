import type { Request, Response, NextFunction } from "express";
import { z } from "zod";

const validateResource =
  (schema: z.ZodType) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse({
        body: req.body,
        query: req.query,
        params: req.params,
      });

      next();
    } catch (e) {
      if (e instanceof z.ZodError) {
        return res.status(400).send(e.issues);
      }

      return res.status(500).send("Internal server error");
    }
  };

export default validateResource;
