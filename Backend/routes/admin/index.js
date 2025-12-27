import express from 'express';
import authRouter from './auth.js';
import dashboardRouter from './dashboard.js';
import issuesRouter from './issues.js';
import leadersRouter from './leaders.js';
import representativesRouter from './representatives.js';
import analyticsRouter from './analytics.js';

const adminRouter = express.Router();

// Mount admin routes
adminRouter.use('/auth', authRouter);
adminRouter.use('/dashboard', dashboardRouter);
adminRouter.use('/issues', issuesRouter);
adminRouter.use('/leaders', leadersRouter);
adminRouter.use('/representatives', representativesRouter);
adminRouter.use('/analytics', analyticsRouter);

export default adminRouter;