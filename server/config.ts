import dotenv from 'dotenv';
import path from 'path';

// Load environment variables
// Try loading from root .env.local
const rootEnvPath = path.resolve(__dirname, '../.env.local');
const result = dotenv.config({ path: rootEnvPath });

if (result.error) {
    // If failed, try relative to CWD just in case
    dotenv.config({ path: path.resolve(process.cwd(), '../.env.local') });
}

export const CONFIG = {
    PORT: process.env.PORT || 3000,
    API_KEY: process.env.GEMINI_API_KEY || process.env.VITE_GEMINI_API_KEY || process.env.API_KEY, // Check all variants
};

if (!CONFIG.API_KEY) {
    console.warn("WARNING: API_KEY is not set. AI features will fail.");
}
