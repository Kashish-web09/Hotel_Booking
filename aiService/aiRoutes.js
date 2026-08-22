import express from 'express';
import { generateDescription } from './aiController.js';

const router = express.Router();

router.post('/generate-description', generateDescription);

export default router;