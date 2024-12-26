import { Router } from 'express';
import userRoutes from '../modules/user/user.route';
const router = Router();
const moduleRoutes = [
  {
    path: '/api',
    route: userRoutes,
  },
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
