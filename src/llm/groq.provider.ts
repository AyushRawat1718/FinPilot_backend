import Groq from "groq-sdk";
import { EVENT_PROMPT } from "../prompts/event.prompt";
import { EventData } from "../types/events.type";
import { LLMProvider } from "./llm.provider";

const groq = new Groq({
  apiKey: process.env.GROQ_API_KEY!,
});

export class GroqProvider implements LLMProvider {
  async extract(message: string): Promise<EventData> {
    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      messages: [
        {
          role: "system",
          content: EVENT_PROMPT,
        },
        {
          role: "user",
          content: message,
        },
      ],
      temperature: 0,
    });

    const text = completion.choices[0].message.content ?? "";

    const cleaned = text
      .replace(/```json/g, "")
      .replace(/```/g, "")
      .trim();

    const event = JSON.parse(cleaned);

    return {
      type: event.t,
      amount: event.a,
      description: event.d,
      needsClarification: event.c,
      confidence: 0.8,
      source: "groq",
    };
  }
}
