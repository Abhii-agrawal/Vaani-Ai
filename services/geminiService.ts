
import { GoogleGenAI, Type } from "@google/genai";
import { Language, LearningMode, UserPersona, LearningGoal } from '../types';

export class GeminiService {
  private ai: GoogleGenAI;

  constructor() {
    // Correctly initialize GoogleGenAI using a named parameter and process.env.API_KEY directly
    this.ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  }

  async generateTutorResponse(
    language: Language,
    mode: LearningMode,
    persona: UserPersona,
    goal: LearningGoal,
    message: string,
    history: { role: 'user' | 'model', content: string }[]
  ) {
    const systemInstruction = `
      You are LingoTutor, a friendly and expert language tutor.
      Target Language: ${language.name}.
      User Persona: ${persona} (Adjust your tone, vocabulary, and speed accordingly).
      User Goal: ${goal}.
      
      RULES:
      1. Zero-Shame Mode: Be encouraging. Never say "Wrong". Use "A better way" or "Try this".
      2. Code-Switching: Allow the user to mix languages (e.g., Hinglish). Respond primarily in ${language.name} with English translations in brackets.
      3. Persona Adaptation:
         - Child: Use simple words, emojis, and exciting tone.
         - Elder: Be extremely patient, respectful, and use clear, classic language.
         - Professional: Use business terminology and formal tone.
      4. Conversation-First: Keep the flow going. Don't stop to correct every tiny detail unless asked.
      5. Provide an English translation for every ${language.name} sentence.
    `;

    try {
      // Use generateContent with appropriate model and configuration
      const response = await this.ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: [
          ...history.map(h => ({ role: h.role === 'user' ? 'user' : 'model', parts: [{ text: h.content }] })),
          { role: 'user', parts: [{ text: message }] }
        ],
        config: {
          systemInstruction,
          temperature: 0.8,
        },
      });

      // Access .text property directly
      return response.text || "Let's try that again!";
    } catch (error) {
      console.error("Gemini Error:", error);
      return "I'm having a small connection hiccup. Can you repeat that?";
    }
  }

  async generateReview(language: Language, history: { role: 'user' | 'model', content: string }[]) {
    const response = await this.ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Review these ${language.name} messages and provide 2-3 constructive "Smart Corrections". 
      Format as JSON: { "corrections": [{ "original": "", "improved": "", "why": "" }], "confidenceScore": 0-100 }`,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            corrections: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  original: { type: Type.STRING },
                  improved: { type: Type.STRING },
                  why: { type: Type.STRING }
                }
              }
            },
            confidenceScore: { type: Type.NUMBER }
          },
          required: ["corrections", "confidenceScore"]
        }
      }
    });
    // Access response text property and parse JSON safely
    const jsonStr = response.text;
    return jsonStr ? JSON.parse(jsonStr) : { corrections: [], confidenceScore: 0 };
  }
}

export const gemini = new GeminiService();
