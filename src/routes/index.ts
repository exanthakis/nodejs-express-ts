import { Router } from 'express';
import usersRoutes from './user.routes.ts';
import sessionsRoutes from './session.routes.ts';
import productRoutes from './product.routes.ts';

const router = Router();

router.use('/users', usersRoutes);
router.use('/sessions', sessionsRoutes);
router.use('/products', productRoutes);

export default router;
