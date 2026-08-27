import { Router } from 'express';
import { createUserHandler } from '../controllers/user.controller.ts';
import validateResource from '../middleware/validateResource.ts';
import { createUserSchema } from '../schema/user.schema.ts';

const userRouter: Router = Router();

userRouter.post('/', validateResource(createUserSchema), createUserHandler);

export default userRouter;
