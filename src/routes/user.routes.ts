import { Router } from "express";
import { createUserHandler } from "../controllers/user.controller.js";
import validateResource from "../middleware/validateResource.js";
import { createUserSchema } from "../schema/user.schema.js";

const router = Router();

router.post("/", validateResource(createUserSchema), createUserHandler);

export default router;
