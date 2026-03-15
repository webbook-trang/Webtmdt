import { GoogleGenAI, Type } from "@google/genai";
import { BookCategory } from "../types";

// Safety check for API Key availability
const hasApiKey = !!process.env.API_KEY;

export const generateBookReview = async (title: string, author: string, category: BookCategory) => {
  if (!hasApiKey) {
    throw new Error("API Key not found. Please set process.env.API_KEY.");
  }

  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
  
  const prompt = `
    I am running a book review blog called "Read with Kate".
    Please write a creative and engaging summary and a detailed review for the book: "${title}" by ${author}.
    Category: ${category}.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            summary: {
              type: Type.STRING,
              description: "A short, catchy introduction (max 30 words)."
            },
            content: {
              type: Type.STRING,
              description: "A detailed review (approx 150-200 words) discussing the key themes and why it's worth reading."
            }
          },
          required: ["summary", "content"],
          propertyOrdering: ["summary", "content"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as { summary: string, content: string };
  } catch (error) {
    console.error("Gemini generation error:", error);
    throw error;
  }
};