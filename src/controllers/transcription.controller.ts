import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export class TranscriptionController {
  constructor() {
    // Bind methods to instance
    this.getTranscriptions = this.getTranscriptions.bind(this);
  }

  async getTranscriptions(req: Request, res: Response) {
    try {
      const page = Number(req.query.page) || 1;
      const limit = 10;
      const skip = (page - 1) * limit;

      const transcriptions = await prisma.transcription.findMany({
        skip,
        take: limit,
        orderBy: {
          createdAt: 'desc'
        }
      });

      const total = await prisma.transcription.count();

      res.json({
        data: transcriptions,
        total,
        page,
        totalPages: Math.ceil(total / limit)
      });
    } catch (error) {
      console.error('Get transcriptions error:', error);
      res.status(500).json({ error: 'Failed to fetch transcriptions' });
    }
  }
} 