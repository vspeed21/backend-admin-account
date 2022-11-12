import express from 'express';
import { 
  addAccount, 
  getAccounts,
} from '../controllers/AccountControllers.js';
import checkAuth from '../middlewares/checkAuth.js';

const router = express.Router();

router.route('/').post(checkAuth, addAccount).get(checkAuth, getAccounts);

export default router;