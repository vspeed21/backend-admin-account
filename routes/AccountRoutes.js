import express from 'express';
import { 
  addAccount, 
  destroyAcc, 
  getAccounts,
  updateAcc,
} from '../controllers/AccountControllers.js';
import checkAuth from '../middlewares/checkAuth.js';

const router = express.Router();

router.route('/').post(checkAuth, addAccount).get(checkAuth, getAccounts);

router.route('/:id')
      .put(checkAuth, updateAcc)
      .delete(checkAuth, destroyAcc);

export default router;