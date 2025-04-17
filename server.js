import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import authRoutes from './routes/auth.routes.js';
import employerRoutes from './routes/employer.routes.js';
import managerRoutes from './routes/manager.routes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());
app.use(morgan('dev'));
connectDB();

app.use('/api/auth', authRoutes);
app.use('/api/employer', employerRoutes);
app.use('/api/manager', managerRoutes);

app.get('/', (req, res) => {
  res.send('API CRM MERN - Backend');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`✅ Serveur démarré sur http://localhost:${PORT}`);
});
