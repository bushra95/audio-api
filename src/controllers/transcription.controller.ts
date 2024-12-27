import { Request, Response } from 'express';
import { prisma } from '../lib/prisma';

export class TranscriptionController {
  constructor() {
    this.getTranscriptions = this.getTranscriptions.bind(this);
  }

  async getTranscriptions(_req: Request, res: Response) {
    try {
      const transcriptions = await prisma.transcription.findMany({
        orderBy: {
          createdAt: 'desc'
        }
      });

      res.json({
        data: transcriptions || [],
        total: transcriptions.length,
        page: 1,
        totalPages: 1
      });
    } catch (error) {
      console.error('Get transcriptions error:', error);
      res.status(500).json({ 
        error: 'Failed to fetch transcriptions',
        data: [],
        total: 0,
        page: 1,
        totalPages: 0
      });
    }
  }
} 