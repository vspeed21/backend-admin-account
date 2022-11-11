import express from 'express';

import {
  signUp,
  confirmAcc,
}from '../controllers/AdminControllers.js'

const router = express.Router();

router.post('/', signUp);
router.get('/confirm/:token', confirmAcc);

export default router;