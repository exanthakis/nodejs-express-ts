import { Router, type Request, type Response } from "express";
// import {
//   getUsers,
//   getUser,
//   createUser,
//   updateUser,
//   deleteUser,
// } from "../controllers/users.controller";

// import { authenticate } from "../middleware/auth.middleware";

const router = Router();

router.get("/users", () => (req: Request, res: Response) => {
  res.sendStatus(200);
});
// router.use(authenticate);

// router.get("/", getUsers);
// router.get("/:id", getUser);
// router.post("/", createUser);
// router.patch("/:id", updateUser);
// router.delete("/:id", deleteUser);

export default router;
