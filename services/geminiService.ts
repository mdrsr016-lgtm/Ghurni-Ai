import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { Message } from '../types';

// Initialize Gemini Client
// Note: process.env.API_KEY is injected by the environment.
const apiKey = process.env.API_KEY || ''; 
const ai = new GoogleGenAI({ apiKey });

const MODEL_NAME = 'gemini-2.5-flash';

export const streamChatResponse = async (
  history: Message[], 
  newMessage: string, 
  onChunk: (text: string) => void
): Promise<string> => {
  try {
    // Transform internal message format to Gemini format
    // Filter out empty messages or messages that failed
    const historyForGemini = history.map(msg => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    const chat: Chat = ai.chats.create({
      model: MODEL_NAME,
      messages: historyForGemini,
      config: {
        systemInstruction: "You are an expert travel assistant named Ghurni Ai. Your goal is to help users plan amazing trips, find flights, hotels, and activities. Be concise, friendly, and helpful. Format your responses with clear headings and bullet points where appropriate.",
      },
    });

    const resultStream = await chat.sendMessageStream({ message: newMessage });

    let fullText = '';
    for await (const chunk of resultStream) {
      const c = chunk as GenerateContentResponse;
      const text = c.text || '';
      fullText += text;
      onChunk(text);
    }
    
    return fullText;

  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw error;
  }
};