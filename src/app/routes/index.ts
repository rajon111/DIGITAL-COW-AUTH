import express from 'express';
import { UserRoutes } from '../modules/user/user.router';
import { CowRoutes } from '../modules/cow/cow.route';
import { AuthRoutes } from '../modules/user/user.auth.router';
import { OrderRoutes } from '../modules/order/order.router';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/auth',
    route: AuthRoutes,
  },
  {
    path: '/cows',
    route: CowRoutes,
  },
  {
    path: '/orders',
    route: OrderRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
