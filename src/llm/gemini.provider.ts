import { GoogleGenAI } from "@google/genai";
import { LLMProvider } from "./llm.provider";
import { EventData } from "../types/events.type";
import { EVENT_PROMPT } from "../prompts/event.prompt";

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY!,
});

export class GeminiProvider implements LLMProvider {
  async extract(message: string): Promise<EventData> {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: `${EVENT_PROMPT}

Message:
${message}`,
    });

    const cleaned = response
      .text!.replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const event = JSON.parse(cleaned);

    return {
      type: event.t,
      amount: event.a,
      description: event.d,
      needsClarification: event.c,
      confidence: 0.8,
      source: "gemini",
    };
  }
}
