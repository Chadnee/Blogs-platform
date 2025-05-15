import express from 'express';
import { AuthorsValidations } from './author.validation';
import validateRequest from '../../middlewares/validateRequest';
import { AuthorsControllers } from './author.controller';
import auth from '../../middlewares/auth';
import { USER_ROLE } from '../users/user.constant';

const router = express.Router();

// router.post('/create-authors',
//     validateRequest(AuthorsValidations.createAuthorsValidation),
//     AuthorsControllers.createAllAuthors
// ); 
router.get('/', auth(USER_ROLE.Admin), AuthorsControllers.getAllAuthors);
router.get('/:authors_Id', AuthorsControllers.getSingleAuthors)
router.delete('/:authors_Id', AuthorsControllers.deleteAuthorsAndUsers)
router.patch('/admin/:authors_id/block', AuthorsControllers.blockedAuthorAndUser )
router.patch('/:authors_id', 
    validateRequest(AuthorsValidations.updateAuthorsValidation),
    AuthorsControllers.updateAuthor
)
export const authorsRoutes = router;