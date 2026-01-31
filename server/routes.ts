import express from 'express';
import multer from 'multer';
import { geminiService } from './services/gemini';
import { ttsService } from './services/tts';

const router = express.Router();
const upload = multer({ storage: multer.memoryStorage() });

// 1. Speech to Text
router.post('/stt', upload.single('audio'), async (req, res) => {
    try {
        if (!req.file) {
            res.status(400).json({ error: 'No audio file provided' });
            return; // Ensure we return to stop execution
        }

        const { transcript, confidence } = await geminiService.transcribeAudio(req.file.buffer, req.file.mimetype);
        res.json({
            type: 'stt_result',
            transcript,
            confidence
        });
    } catch (error) {
        res.status(500).json({ error: 'STT failed' });
    }
});

// 2. Text to Speech
router.post('/tts', async (req, res) => {
    try {
        const { text, lang } = req.body;
        if (!text) {
            res.status(400).json({ error: "Text is required" });
            return;
        }
        const audioUrl = ttsService.getAudioUrl(text, lang || 'en');
        res.json({
            type: 'tts_result',
            text,
            audio_url: audioUrl
        });
    } catch (error) {
        res.status(500).json({ error: 'TTS failed' });
    }
});

// 3. Chat
router.post('/chat', async (req, res) => {
    try {
        const { message, history } = req.body;
        const response = await geminiService.generateChatResponse(message, history);
        res.json({
            type: 'chat_response',
            reply: response
        });
    } catch (error) {
        res.status(500).json({ error: 'Chat failed' });
    }
});

// 4. Generate Exercise
router.post('/exercise/match-pairs', async (req, res) => {
    try {
        const { level } = req.body;
        const exercise = await geminiService.generateMatchPairsExercise(level || 'beginner');

        // Enrich with audio URLs for the audio items
        // exercise.pairs has { id, text, audio_text }
        const audioItems = exercise.pairs.map((p: any) => ({
            id: `a_${p.id}`,
            audio_url: ttsService.getAudioUrl(p.audio_text),
            correct_text_id: p.id
        }));

        // text items
        const textItems = exercise.pairs.map((p: any) => ({
            id: p.id,
            text: p.text
        }));

        // Scramble text items (simple shuffle)
        const shuffledTextItems = textItems.sort(() => Math.random() - 0.5);

        res.json({
            type: 'match_pairs_exercise',
            exercise_id: exercise.exercise_id,
            instructions: exercise.instructions,
            audio_items: audioItems,
            text_items: shuffledTextItems
        });

    } catch (error) {
        res.status(500).json({ error: 'Exercise generation failed' });
    }
});

// 5. Evaluate Exercise
router.post('/exercise/evaluate', async (req, res) => {
    try {
        const { answers, total } = req.body; // answers: [{ correct: boolean }]
        const score = answers.filter((a: any) => a.correct).length;

        const feedbackData = await geminiService.evaluateExercise(answers);

        res.json({
            type: 'exercise_result',
            score,
            total: answers.length,
            feedback: feedbackData.feedback
        });
    } catch (error) {
        res.status(500).json({ error: 'Evaluation failed' });
    }
});

export default router;
