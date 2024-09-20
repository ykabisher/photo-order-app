import express from 'express';
import dotenv from 'dotenv';
import morgan from 'morgan';
import mongoose from 'mongoose';
import photoRoutes from './routes/photoRoutes';
import orderRoutes from './routes/orderRoutes';

dotenv.config();

const app = express();

app.use(express.json());
app.use(morgan('dev'));

// MongoDB Connection
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/test';

mongoose
  .connect(MONGO_URI, {
    connectTimeoutMS: 10000 // Set the timeout to 10 seconds (10000 ms)
  })
  .then(() => {
    console.log('Connected to MongoDB');
  })
  .catch((error) => {
    console.log('MongoDB connection error:', error);
  });

// Routes
app.use('/api', photoRoutes);
app.use('/api', orderRoutes);

export default app;