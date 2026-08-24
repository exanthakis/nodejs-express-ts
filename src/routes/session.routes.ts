import {
  createUserSession,
  deleteSession,
  getUserSession,
} from "@controllers/session.controller.js";
import { requireUser } from "@middleware/requireUser.js";
import validateResource from "@middleware/validateResource.js";
import { createSessionSchema } from "@schema/session.schema.js";
import express from "express";

const router = express.Router();

router.get("/", requireUser, getUserSession);
router.post("/", validateResource(createSessionSchema), createUserSession);
router.delete("/", requireUser, deleteSession);

export default router;
