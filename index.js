import express from 'express';
import dotenv from 'dotenv';

import connectDB from './config/db.js';
import AdminRoutes from './routes/AdminRoutes.js';
import AccountRoutes from './routes/AccountRoutes.js';

const app = express();

app.use(express.json());
dotenv.config();
connectDB();

app.use('/api/admin', AdminRoutes);
app.use('/api/account', AccountRoutes);

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server working on PORT ${PORT}`);
});