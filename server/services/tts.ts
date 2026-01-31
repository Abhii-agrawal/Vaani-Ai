import * as googleTTS from 'google-tts-api';

export class TTSService {

    // Generates a URL that plays the audio
    // Note: user must check if the URL is accessible from their network/region
    getAudioUrl(text: string, lang: string = 'en'): string {
        try {
            const url = googleTTS.getAudioUrl(text, {
                lang: lang,
                slow: false,
                host: 'https://translate.google.com',
            });
            return url;
        } catch (error) {
            console.error("TTS Error:", error);
            return "";
        }
    }
}

export const ttsService = new TTSService();
