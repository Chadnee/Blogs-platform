import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidation } from './user.validation';
import { UserControllers } from './user.controller';

const router = express.Router();

router.post('/create-Author', 
    validateRequest(UserValidation.createUser),
UserControllers.createAuthor);
router.patch('/admin/users/:user_Id/block', UserControllers.blockedUserAndAuthor)
router.get('/:users_Id', UserControllers.getSingleUsers)

export const UserRoutes = router;
///api/admin/users/:userId/block
