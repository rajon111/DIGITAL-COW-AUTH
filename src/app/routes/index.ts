import express from 'express';
import { UserRoutes } from '../modules/user/user.router';
import { CowRoutes } from '../modules/cow/cow.route';

const router = express.Router();

const moduleRoutes = [
  {
    path: '/users',
    route: UserRoutes,
  },
  {
    path: '/cows',
    route: CowRoutes,
  },
];

moduleRoutes.forEach(route => router.use(route.path, route.route));

export default router;
