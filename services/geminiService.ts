import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { Message } from '../types';

const MODEL_NAME = 'gemini-2.5-flash';

export const streamChatResponse = async (
  history: Message[], 
  newMessage: string, 
  onChunk: (text: string) => void
): Promise<string> => {
  try {
    // Lazy initialization of the Gemini client.
    // This prevents the application from crashing on startup if the API key is not present (common in build/preview environments).
    const apiKey = process.env.API_KEY;
    if (!apiKey) {
      throw new Error("API Key not found. Please check your environment variables.");
    }

    const ai = new GoogleGenAI({ apiKey: apiKey });

    // Transform internal message format to Gemini format
    // Filter out empty messages or messages that failed
    const historyForGemini = history.map(msg => ({
      role: msg.role === 'model' ? 'model' : 'user',
      parts: [{ text: msg.text }]
    }));

    // Use 'history' property for conversation context, NOT 'messages'
    const chat: Chat = ai.chats.create({
      model: MODEL_NAME,
      history: historyForGemini,
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