import express from 'express';
import authRoutes from './auth.routes.js';

const router = express.Router();

const rootRoutes = [authRoutes];

rootRoutes.map((route) => {
  router.use(route);
});

export default router;
