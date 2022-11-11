import express from 'express';
import dotenv from 'dotenv';

import connectDB from './config/db.js';
import AdminRoutes from './routes/AdminRoutes.js';

const app = express();

app.use(express.json());
dotenv.config();
connectDB();

app.use('/api/admin', AdminRoutes);

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server working on PORT ${PORT}`);
});