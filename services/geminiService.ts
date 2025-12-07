import { GoogleGenAI } from "@google/genai";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

const SYSTEM_INSTRUCTION = `
You are "ArdBot", the virtual studio assistant for the website "ARDBEATZ".
ARDBEATZ is a brand owned by a professional music producer, mixing/mastering engineer, and WiFi business owner.

Your goal is to assist visitors with:
1. Music Production: Suggesting lyrical rhymes, song concepts, or explaining mixing/mastering terms.
2. WiFi Services: Explaining basic internet troubleshooting or describing why high-speed internet is good for streaming music.
3. Engaging with the brand: Encouraging them to book a session or buy a WiFi plan.

Tone: Cool, professional, creative, slightly urban but polite.
Keep answers concise (under 100 words) unless asked for lyrics.
`;

export const sendMessageToGemini = async (message: string, history: { role: string; parts: { text: string }[] }[]) => {
  try {
    if (!apiKey) {
      throw new Error("API Key is missing. Please configure the environment.");
    }

    // Map history to the format expected by the SDK if necessary, but here we use simple generateContent for single turn
    // or chat session for multi-turn. Let's use chat session.

    const chat = ai.chats.create({
      model: 'gemini-2.5-flash',
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
      },
      history: history // Pass previous context
    });

    const result = await chat.sendMessage({
      message: message
    });

    return result.text;
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};