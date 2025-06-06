import express from 'express';
import { carregarDashboard } from '../controllers/dashboardController.js';

const router = express.Router();

router.get('/', carregarDashboard);

export default router;
