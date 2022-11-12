import express from 'express';

import {
  signUp,
  confirmAcc,
  forgotPasswordSendEmail,
  checkToken,
  savePassword,
  login,
}from '../controllers/AdminControllers.js'

const router = express.Router();

//Public area
router.post('/', signUp);
router.get('/confirm/:token', confirmAcc);
router.post('/login', login);
router.post('/forgot-password', forgotPasswordSendEmail);
router.route('/forgot-password/:token').get(checkToken).post(savePassword);

export default router;