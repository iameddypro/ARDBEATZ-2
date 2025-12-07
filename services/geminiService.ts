import { GoogleGenAI } from "@google/genai";
import { SITE_CONFIG } from "../data/content";

const apiKey = process.env.API_KEY || '';
const ai = new GoogleGenAI({ apiKey });

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
        systemInstruction: SITE_CONFIG.chatbot.systemInstruction,
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