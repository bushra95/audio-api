import express from 'express';
import { TranscriptionController } from '../controllers/transcription.controller';

export const transcriptionRoutes = express.Router();
const controller = new TranscriptionController();

transcriptionRoutes.get('/', controller.getTranscriptions);
transcriptionRoutes.post('/', controller.createTranscription);
transcriptionRoutes.delete('/:id', controller.deleteTranscription); 