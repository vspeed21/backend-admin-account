import express from 'express';
import { 
  addAccount 
} from '../controllers/AccountControllers.js';
import checkAuth from '../middlewares/checkAuth.js';

const router = express.Router();

router.route('/').post(checkAuth, addAccount);

export default router;