import express from 'express';

import {
  signUp,
  confirmAcc,
  forgotPasswordSendEmail,
  checkToken,
  savePassword,
  login,

  getPerfil,
  updateProfile,
}from '../controllers/AdminControllers.js'
import checkAuth from '../middlewares/checkAuth.js';

const router = express.Router();

//Public endpoints/request
router.post('/', signUp);
router.get('/confirm/:token', confirmAcc);
router.post('/login', login);
router.post('/forgot-password', forgotPasswordSendEmail);
router.route('/forgot-password/:token').get(checkToken).post(savePassword);

//Private endpoints/request
router.get('/perfil', checkAuth, getPerfil);
router.put('/perfil', checkAuth, updateProfile);

export default router;