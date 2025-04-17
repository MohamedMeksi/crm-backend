import express from 'express';
import { getDashboardStats, getManagers, createManager, updateManager, deleteManager, getLeads, createLead, updateLead, deleteLead } from '../controllers/employer.controller.js';
import { authMiddleware, roleMiddleware } from '../middlewares/auth.js';

const router = express.Router();

// Middleware d'authentification et de rôle
router.use(authMiddleware);
router.use(roleMiddleware('employer'));

// Dashboard Stats
router.get('/dashboard-stats', getDashboardStats);

// Managers Routes
router.get('/managers', getManagers);
router.post('/managers', createManager);
router.put('/managers/:managerId', updateManager);
router.delete('/managers/:managerId', deleteManager);

// Leads Routes
router.get('/leads', getLeads);
router.post('/leads', createLead);
router.put('/leads/:leadId', updateLead);
router.delete('/leads/:leadId', deleteLead);

export default router;
