import express from 'express';

import {
  signUp,
  confirmAcc,
  forgotPasswordSendEmail,
}from '../controllers/AdminControllers.js'

const router = express.Router();

router.post('/', signUp);
router.get('/confirm/:token', confirmAcc);
router.post('/forgot-password', forgotPasswordSendEmail)

export default router;