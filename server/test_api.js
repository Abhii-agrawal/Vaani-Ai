// Using native fetch (Node 18+)

// We will use standard fetch available in Node.js 18+ or the user's environment if compatible
// If not, we might need to fallback. 

const BASE_URL = 'http://localhost:3000/api';

async function testEndpoints() {
    console.log("Starting API Tests...");

    // 1. Test Chat
    try {
        console.log("\nTesting /api/chat ...");
        const chatRes = await fetch(`${BASE_URL}/chat`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ message: "Hello, how are you?", history: [] })
        });
        const chatData = await chatRes.json();
        console.log("Chat Response:", JSON.stringify(chatData, null, 2));
    } catch (e) {
        console.error("Chat Test Failed", e.message);
    }

    // 2. Test TTS
    try {
        console.log("\nTesting /api/tts ...");
        const ttsRes = await fetch(`${BASE_URL}/tts`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: "Hello world" })
        });
        const ttsData = await ttsRes.json();
        console.log("TTS Response:", JSON.stringify(ttsData, null, 2));
    } catch (e) {
        console.error("TTS Test Failed", e.message);
    }

    // 3. Test Exercise Generation
    try {
        console.log("\nTesting /api/exercise/match-pairs ...");
        const exRes = await fetch(`${BASE_URL}/exercise/match-pairs`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ level: 'beginner' })
        });
        const exData = await exRes.json();
        console.log("Exercise Response:", JSON.stringify(exData, null, 2));
    } catch (e) {
        console.error("Exercise Test Failed", e.message);
    }

    // 4. Test Evaluation
    try {
        console.log("\nTesting /api/exercise/evaluate ...");
        const evalRes = await fetch(`${BASE_URL}/exercise/evaluate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                answers: [{ correct: true }, { correct: false }, { correct: true }],
                total: 3
            })
        });
        const evalData = await evalRes.json();
        console.log("Evaluation Response:", JSON.stringify(evalData, null, 2));
    } catch (e) {
        console.error("Evaluation Test Failed", e.message);
    }
}

// Check if server is running first? 
// In this script we just assume it is.
testEndpoints();
