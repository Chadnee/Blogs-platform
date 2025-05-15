import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { UserControllers } from './user.controller';
import { AuthorsValidations } from '../authors/author.validation';
import { adminValidations } from '../admins/admin.validation';

const router = express.Router();

//user --> author's routes
router.post('/create-author', 
    validateRequest(AuthorsValidations.createAuthorsValidation),
UserControllers.createAuthor);
router.get('/:users_Id', UserControllers.getSingleUsers)

//user --> admin's routes
router.post('/create-admin',
    validateRequest(adminValidations.createAdminValidation),
    UserControllers.createAdmin
)
export const UserRoutes = router;
///api/admin/users/:userId/block
