import { Router } from 'express';
import { authorsRoutes } from '../modules/authors/author.route';
import { UserRoutes } from '../modules/users/user.route';

const router = Router();
const moduleRoutes = [
  {
    path: '/authors',
    route: authorsRoutes,
  },
  {
    path: '/users',
    route: UserRoutes,
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
