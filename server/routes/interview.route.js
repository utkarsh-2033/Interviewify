import express from 'express';
import {addInterview, sendInterviewDetails} from '../controllers/interview.controller.js';
import { send } from 'vite';

const router = express.Router();
router.post('/interviews', addInterview);
router.get('/interviews/:email', sendInterviewDetails);

export default router;