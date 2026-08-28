import { object, string, z } from 'zod';

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
