import {
  getUserSessionHandler,
  createUserSessionHandler,
  deleteSessionHandler,
} from "../controllers/session.controller.ts";
import { requireUser } from "../middleware/requireUser.ts";
import validateResource from "../middleware/validateResource.ts";
import { createSessionSchema } from "../schema/session.schema.ts";
import express, { Router } from "express";

const sessionRouter: Router = express.Router();

sessionRouter.get("/", requireUser, getUserSessionHandler);
sessionRouter.post(
  "/",
  validateResource(createSessionSchema),
  createUserSessionHandler,
);
sessionRouter.delete("/", requireUser, deleteSessionHandler);

export default sessionRouter;
