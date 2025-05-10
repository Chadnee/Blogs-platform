import express from 'express';
import { AuthorsValidations } from './author.validation';
import validateRequest from '../../middlewares/validateRequest';
import { AuthorsControllers } from './author.controller';

const router = express.Router();

// router.post('/create-authors',
//     validateRequest(AuthorsValidations.createAuthorsValidation),
//     AuthorsControllers.createAllAuthors
// );
router.get('/', AuthorsControllers.getAllAuthors);
router.get('/:authors_Id', AuthorsControllers.getSingleAuthors)
router.delete('/:authors_Id', AuthorsControllers.deleteAuthorsAndUsers)

export const authorsRoutes = router;