import {
  validationLogin,
  validationRegister,
  validationResetPassword,
  validationSendEmail,
} from '../middlewares/auth.middleware.js';
import express from 'express';
import { verifyToken } from '../middlewares/verify-token.middleware.js';
import { wrapRequestHandler } from '../utils/handler.ulti.js';
import { authController } from '../controllers/auth.controller.js';

const router = express.Router();

//Verify token
router.get('/verify-token', wrapRequestHandler(authController.verifyToken));

//REGISTER
router.post(
  '/register',
  wrapRequestHandler(validationRegister),
  wrapRequestHandler(authController.register),
);

//LOGIN
router.post(
  '/login',
  wrapRequestHandler(validationLogin),
  wrapRequestHandler(authController.login),
);

export default router;
