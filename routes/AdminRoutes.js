import express from 'express';

import {
  signUp
}from '../controllers/AdminControllers.js'

const router = express.Router();

router.post('/', signUp);

export default router;