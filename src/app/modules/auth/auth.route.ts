import express from 'express'
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidation } from './auth.validation';
import { AuthControllers } from './auth.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../users/user.constant';
import { Admin } from '../admins/admin.modelAndSchema';

const router = express.Router();

// remember dont use auth middleware for log in or refresh token any time!!
router.post('/login',
    validateRequest(AuthValidation.loginValidation),
    AuthControllers.loginUser
);
router.patch('/changed-password', auth(USER_ROLE.Admin, USER_ROLE.Author),
    validateRequest(AuthValidation.ChangePasswordValidation),
    AuthControllers.changePassword
);
router.post('/refresh-token',
    validateRequest(AuthValidation.refreshTokenValidation),
    AuthControllers.createRefreshToken
)


export const authRoutes = router;