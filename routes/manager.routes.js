import express from 'express';
import { getMyLeads, updateLeadStatusOrNotes } from '../controllers/manager.controller.js';
import { authMiddleware } from '../middlewares/auth.js';
import { requireRole } from '../middlewares/role.js';

const router = express.Router();

router.use(authMiddleware, requireRole('manager'));

router.get('/leads', getMyLeads);
router.patch('/leads/:id', updateLeadStatusOrNotes);

export default router;
