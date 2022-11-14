import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';

import connectDB from './config/db.js';
import AdminRoutes from './routes/AdminRoutes.js';
import AccountRoutes from './routes/AccountRoutes.js';

const app = express();

app.use(express.json());
dotenv.config();
connectDB();

const domains = [process.env.FRONTEND_URL];

const corsOptions = {
  origin: function(origin, callback) {
    if(domains.indexOf(origin) !== -1 || !origin) {
      callback(null, true);
    }else{
      callback(new Error('El Request no esta permitido por CORS'));
    }
  }
}

app.use(cors(corsOptions));

app.use('/api/admin', AdminRoutes);
app.use('/api/account', AccountRoutes);

const PORT = process.env.PORT || 4000
app.listen(PORT, () => {
  console.log(`Server working on PORT ${PORT}`);
});