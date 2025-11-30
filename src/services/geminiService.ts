import { GoogleGenAI } from "@google/genai";

let aiClient: GoogleGenAI | null = null;

// Initialize client only when needed to adhere to constraints about API Key handling
const getAiClient = (): GoogleGenAI => {
  if (!aiClient) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (!apiKey) {
      console.warn('GEMINI_API_KEY is not configured. AI features will not work.');
    }
    aiClient = new GoogleGenAI({ apiKey: apiKey || '' });
  }
  return aiClient;
};

export const generateTravelAdvice = async (userQuery: string): Promise<string> => {
  try {
    const ai = getAiClient();
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: userQuery,
      config: {
        systemInstruction: "You are an elite travel concierge for Natlaupa, a luxury hotel booking platform. Your tone is sophisticated, brief, and inspiring. Recommend destinations or hotel types based on the user's mood. Keep responses under 50 words.",
      }
    });
    return response.text || "I apologize, I am currently unable to access the travel archives. Please try again later.";
  } catch (error) {
    console.error("AI Service Error:", error);
    return "Our concierge service is momentarily unavailable.";
  }
};
