import dotenv from 'dotenv';
dotenv.config();

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import { connectDB } from './config/database';
import productRoutes from './routes/productRoutes';
import authRoutes from './routes/authRoutes';
import { errorHandler } from './middlewares/errorHandler';

const app = express();
const PORT = process.env.PORT || 4444;

// Indicar a Express que está detrás de un proxy (Render) para que el rate limiter use X-Forwarded-For correctamente
app.set('trust proxy', 1);

// Middlewares
app.use(cors());
app.use(express.json());
app.use(morgan('dev'));

app.use('/uploads', express.static('uploads')); // ← AGREGAR ESTA LÍNEA

// Rutas
app.get('/', (req, res) => {
  res.json({ message: 'API funcionando correctamente' });
});

app.use('/api/products', productRoutes);
app.use('/api/auth', authRoutes);

// Manejo de errores
app.use(errorHandler);

// Conectar DB e iniciar servidor
connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  });
});