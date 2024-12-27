import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import { ENV } from './config/env';
import { authRouter } from './routes/auth.routes';
import { transcriptionRouter } from './routes/transcription.routes';

export const app = express();

// CORS configuration
app.use(cors({
  origin: ENV.CORS_ORIGIN,
  credentials: true
}));

app.use(express.json());

// API routes with prefix
app.use('/api/auth', authRouter);
app.use('/api/transcriptions', transcriptionRouter);

// Error handling middleware
app.use((err: Error, _req: Request, res: Response, next: NextFunction) => {
  console.error('Global error:', err);
  res.status(500).json({ error: err.message || 'Something went wrong!' });
  next(err);
}); 