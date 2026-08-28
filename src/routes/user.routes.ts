import { Router } from 'express';
import { createUserHandler } from '../controllers/user.controller.ts';
import validateResource from '../middleware/validateResource.ts';
import { createUserSchema } from '../schemas/user.schema.ts';

const userRouter: Router = Router();

/**
 * @openapi
 * '/api/users':
 *  post:
 *     tags:
 *     - User
 *     summary: Register a user
 *     requestBody:
 *      required: true
 *      content:
 *        application/json:
 *           schema:
 *              $ref: '#/components/schemas/CreateUserInput'
 *     responses:
 *      200:
 *        description: Success
 *        content:
 *          application/json:
 *            schema:
 *              $ref: '#/components/schemas/CreateUserResponse'
 *      409:
 *        description: Conflict
 *      400:
 *        description: Bad request
 */
userRouter.post('/', validateResource(createUserSchema), createUserHandler);

export default userRouter;
