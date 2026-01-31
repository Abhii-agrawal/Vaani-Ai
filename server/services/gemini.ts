import { GoogleGenAI, Type } from '@google/genai';
import { CONFIG } from '../config';

class GeminiService {
    private client: GoogleGenAI;

    constructor() {
        this.client = new GoogleGenAI({ apiKey: CONFIG.API_KEY });
    }

    // 1. Speech to Text (STT)
    async transcribeAudio(audioBuffer: Buffer, mimeType: string): Promise<{ transcript: string; confidence: number }> {
        try {
            // Gemini 1.5 Flash is good for multimodal
            const response = await this.client.models.generateContent({
                model: 'gemini-2.0-flash-exp', // using latest preview for best multimodal performance
                contents: [
                    {
                        role: 'user',
                        parts: [
                            {
                                inlineData: {
                                    mimeType: mimeType,
                                    data: audioBuffer.toString('base64')
                                }
                            },
                            { text: "Transcribe this audio exactly. Return ONLY the text." }
                        ]
                    }
                ]
            });

            const transcript = response.text ? response.text.trim() : "";
            return {
                transcript,
                confidence: 0.95 // Gemini doesn't always return confidence per word easily in text mode, mocking high confidence for now
            };
        } catch (error) {
            console.error("STT Error:", error);
            throw new Error("Failed to transcribe audio");
        }
    }

    // 2. Chat / conversational response
    async generateChatResponse(message: string, history: any[] = []): Promise<string> {
        try {
            const systemInstruction = `
        You are VaaniAI, a friendly language tutor.
        Your goal is to be helpful, encouraging, and clear.
        Keep responses concise and conversational.
        If the user makes a mistake, gently correct them but prioritize communication.
      `;

            const response = await this.client.models.generateContent({
                model: 'gemini-2.0-flash-exp',
                config: {
                    systemInstruction,
                },
                contents: [
                    ...history.map(h => ({ role: h.role, parts: [{ text: h.content }] })),
                    { role: 'user', parts: [{ text: message }] }
                ]
            });

            return response.text || "I didn't catch that, could you say it again?";
        } catch (error) {
            console.error("Chat Error:", error);
            return "I'm having a little trouble thinking right now.";
        }
    }

    // 3. Generate Match Pairs Exercise
    async generateMatchPairsExercise(level: 'beginner' | 'intermediate'): Promise<any> {
        try {
            const prompt = `
        Generate a "Match the Pairs" exercise for a ${level} language learner (English/Hindi context).
        Create 4 pairs of simple words or phrases.
        Return raw JSON with this structure:
        {
          "type": "match_pairs_exercise",
          "exercise_id": "mp_${Date.now()}",
          "instructions": "Listen to the audio and select the correct matching text.",
          "pairs": [
            { "id": "p1", "text": "Apple", "audio_text": "Apple" },
            { "id": "p2", "text": "Boy", "audio_text": "Boy" }
          ]
        }
        The 'audio_text' is what will be spoken.
        Do NOT wrap in markdown code blocks. Just valid JSON.
      `;

            const response = await this.client.models.generateContent({
                model: 'gemini-2.0-flash-exp',
                config: {
                    responseMimeType: 'application/json',
                    responseSchema: {
                        type: Type.OBJECT,
                        properties: {
                            type: { type: Type.STRING },
                            exercise_id: { type: Type.STRING },
                            instructions: { type: Type.STRING },
                            pairs: {
                                type: Type.ARRAY,
                                items: {
                                    type: Type.OBJECT,
                                    properties: {
                                        id: { type: Type.STRING },
                                        text: { type: Type.STRING },
                                        audio_text: { type: Type.STRING }
                                    },
                                    required: ["id", "text", "audio_text"]
                                }
                            }
                        },
                        required: ["type", "exercise_id", "instructions", "pairs"]
                    }
                },
                contents: [{ role: 'user', parts: [{ text: prompt }] }]
            });

            const json = JSON.parse(response.text || "{}");
            return json;
        } catch (error) {
            console.error("Exercise Gen Error:", error);
            throw error;
        }
    }

    // 4. Evaluate Answer
    async evaluateExercise(userAnswers: any[]): Promise<any> {
        // For match pairs, logic is simple enough to be deterministic, 
        // but we'll use AI for "friendly feedback".

        const prompt = `
       The user just completed a matching exercise.
       They got ${userAnswers.filter((a: any) => a.correct).length} out of ${userAnswers.length} correct.
       Generate a friendly, encouraging feedback message string based on their score.
       Return JSON: { "feedback": "string" }
     `;

        const response = await this.client.models.generateContent({
            model: 'gemini-2.0-flash-exp',
            config: { responseMimeType: 'application/json' },
            contents: [{ role: 'user', parts: [{ text: prompt }] }]
        });

        return JSON.parse(response.text || "{}");
    }
}

export const geminiService = new GeminiService();
