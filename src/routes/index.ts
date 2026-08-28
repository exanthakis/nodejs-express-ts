import { Router } from 'express';
import usersRoutes from './user.routes.ts';
import sessionsRoutes from './session.routes.ts';
import productRoutes from './product.routes.ts';

const router = Router();

/**
 * @openapi
 * /healthcheck:
 *  get:
 *     tags:
 *     - Healthcheck
 *     description: Responds if the app is up and running
 *     responses:
 *       200:
 *         description: App is up and running
 */
router.get('/healthcheck', (_req, res) => {
  res.sendStatus(200);
});

router.use('/api/users', usersRoutes);
router.use('/api/sessions', sessionsRoutes);
router.use('/api/products', productRoutes);

export default router;
