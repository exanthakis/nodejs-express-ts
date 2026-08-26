import {
  getUserSessionHandler,
  createUserSessionHandler,
  deleteSessionHandler,
} from "../controllers/session.controller.js";
import { requireUser } from "../middleware/requireUser.js";
import validateResource from "../middleware/validateResource.js";
import { createSessionSchema } from "../schema/session.schema.js";
import express from "express";

const router = express.Router();

router.get("/", requireUser, getUserSessionHandler);
router.post(
  "/",
  validateResource(createSessionSchema),
  createUserSessionHandler,
);
router.delete("/", requireUser, deleteSessionHandler);

export default router;
