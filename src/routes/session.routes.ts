import { createUserSession } from "@controllers/session.controller.js";
import validateResource from "@middleware/validateResource.js";
import { createSessionSchema } from "@schema/session.schema.js";
import express from "express";

const router = express.Router();

router.post("/", validateResource(createSessionSchema), createUserSession);

export default router;
