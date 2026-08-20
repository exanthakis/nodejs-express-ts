import { object, string, z } from "zod";

export const createSessionSchema = object({
  body: object({
    email: z.email({
      error: (issue) =>
        issue.input === undefined
          ? "Email is required"
          : "Invalid email address",
    }),
    password: string({ error: "Password is required" }).min(
      6,
      "Password too short - should be 6 chars minimum",
    ),
  }),
});
