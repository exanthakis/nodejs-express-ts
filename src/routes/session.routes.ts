import {
  getUserSessionHandler,
  createUserSessionHandler,
  deleteSessionHandler,
} from "../controllers/session.controller.js";
import { requireUser } from "../middleware/requireUser.js";
import validateResource from "../middleware/validateResource.js";
import { createSessionSchema } from "../schema/session.schema.js";
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
