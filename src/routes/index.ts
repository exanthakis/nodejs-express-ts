import { Router } from "express";
import usersRoutes from "./user.routes.js";
import sessionsRoutes from "./session.routes.js";
import productRoutes from "./product.routes.js";

const router = Router();

router.use("/users", usersRoutes);
router.use("/sessions", sessionsRoutes);
router.use("/products", productRoutes);

export default router;
