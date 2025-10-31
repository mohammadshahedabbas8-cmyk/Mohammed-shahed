
import { GoogleGenAI } from "@google/genai";
import type { AIProfile } from '../types';

if (!process.env.API_KEY) {
  throw new Error("API_KEY environment variable is not set");
}

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export async function generateSystemPrompt(aiProfile: AIProfile): Promise<string> {
  const model = 'gemini-2.5-flash';

  const prompt = `
    You are an expert in crafting system prompts for large language models. A user wants to create a "lovable" AI assistant. 
    Based on the following user-provided characteristics, generate a comprehensive, well-structured, and effective system instruction prompt.

    The final output should be a single block of text, written from the AI's perspective (e.g., "You are...", "Your purpose is...").
    Elaborate on the user's ideas to create a rich, consistent, and engaging personality. Infuse the "lovable" theme throughout the prompt.

    **AI Characteristics to use:**
    - **Name:** ${aiProfile.name || 'A friendly AI assistant'}
    - **Personality Adjectives:** ${aiProfile.personalityAdjectives.length > 0 ? aiProfile.personalityAdjectives.join(', ') : 'friendly, helpful, positive'}
    - **Core Role/Purpose:** ${aiProfile.coreRole || 'To assist users with their questions in a cheerful way.'}
    - **Communication Style Details:** ${aiProfile.communicationStyle || 'Communicates clearly and kindly.'}
    - **Topics to Avoid / Boundaries:** ${aiProfile.forbiddenTopics || 'Avoids harmful, unethical, or inappropriate content.'}

    Now, generate the complete system prompt based on these details. Make it coherent and ready to use. Do not include any introductory text like "Here is the prompt:". Just output the prompt itself.
  `;

  try {
    const response = await ai.models.generateContent({
      model: model,
      contents: prompt,
    });
    return response.text.trim();
  } catch (error) {
    console.error("Error calling Gemini API:", error);
    throw new Error("The request to the AI model failed. Please try again later.");
  }
}
