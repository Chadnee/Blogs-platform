import express from 'express';
import { adminControllers } from './admin.controller';

const router = express.Router();

router.get('/', adminControllers.getAllAdmin);
router.get('/:admin_id', adminControllers.getSingleAdmin);
router.delete('/:admin_id', adminControllers.deleteAdminAndUser)

export const AdminRoutes = router;