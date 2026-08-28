import { object, string, z } from 'zod';

/**
 * @openapi
 * components:
 *   schemas:
 *     CreateUserInput:
 *       type: object
 *       required:
 *         - email
 *         - name
 *         - password
 *         - passwordConfirmation
 *       properties:
 *         email:
 *           type: string
 *           format: email
 *           default: jane.doe@example.com
 *         name:
 *           type: string
 *           default: Jane Doe
 *         password:
 *           type: string
 *           format: password
 *           default: stringPassword123
 *         passwordConfirmation:
 *           type: string
 *           format: password
 *           default: stringPassword123
 *
 *     CreateUserResponse:
 *       type: object
 *       properties:
 *         _id:
 *           type: string
 *           default: 64f1a2b3c4d5e6f789012345
 *         email:
 *           type: string
 *           format: email
 *           default: jane.doe@example.com
 *         name:
 *           type: string
 *           default: Jane Doe
 *         createdAt:
 *           type: string
 *           format: date-time
 *           default: 2026-08-28T12:00:00.000Z
 *         updatedAt:
 *           type: string
 *           format: date-time
 *           default: 2026-08-28T12:00:00.000Z
 */
export const createUserSchema = object({
  body: object({
    name: string({ error: 'Name is required' }),
    password: string({ error: 'Password is required' }).min(
      6,
      'Password too short - should be 6 chars minimum'
    ),
    passwordConfirmation: string({
      error: 'PasswordConfirmation is required',
    }),
    email: z.email({
      error: (issue) =>
        issue.input === undefined
          ? 'Email is required'
          : 'Invalid email address',
    }),
  }).refine((data) => data.password === data.passwordConfirmation, {
    message: 'Passwords do not match',
    path: ['passwordConfirmation'],
  }),
});

export type CreateUserInput = z.infer<typeof createUserSchema>;
