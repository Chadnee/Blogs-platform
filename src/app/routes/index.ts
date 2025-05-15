import { Router } from 'express';
import { authorsRoutes } from '../modules/authors/author.route';
import { UserRoutes } from '../modules/users/user.route';
import { AdminRoutes } from '../modules/admins/admin.router';
import { BlogRoutes } from '../modules/blogs/blog.route';
import { authRoutes } from '../modules/auth/auth.route';

const router = Router();
const moduleRoutes = [
  {
    path: '/authors',
    route: authorsRoutes,
  },
  {
    path: '/users', 
    route: UserRoutes,
  },
  {
    path: '/admins',
    route: AdminRoutes,
  },
  {
    path: '/blogs',
    route: BlogRoutes
  },
  {
    path: '/auth',
    route: authRoutes
  }
];

moduleRoutes.forEach((route) => router.use(route.path, route.route));

export default router;
