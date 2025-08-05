// Node Modules
import { GoogleGenAI } from "@google/genai";

// Env Variables
const GEMINI_API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

// Using Google Gemini API for AI task generation.
const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

// The getAIResponse function prompts the gemini model with predefined rules that will be used to generate the user's tasks.
// It will generate a response based on the provided data schema which will align with the structuring used in the application.
async function getAiResponse(prompt: string): Promise<string | undefined> {
  const response = await ai.models.generateContent({
    model: "gemini-2.0-flash",
    contents: `Generate and return a list of tasks needed to complete the following prompt with the given JSON schema. Prompt: ${prompt}`,
    config: {
      responseMimeType: "application/json",
      responseSchema: {
        type: "array",
        items: {
          type: "object",
          properties: {
            taskContent: {
              // Description of the task
              type: "string",
            },
            dueDate: {
              // Due date of the task or null if not provided
              type: ["string", "null"],
              format: "date-time",
            },
          },
          propertyOrdering: ["taskContent", "dueDate"],
          required: ["dueDate"],
        },
      },
      systemInstruction: `Requirements for prompt: 1. Ensure tasks align with provided prompt. 2. Set the "dueDate" property relative to today's date: ${new Date()}. 3. Return an array of tasks matching the provided responseSchema.`,
    },
  });

  return response.text;
}

export default getAiResponse;
