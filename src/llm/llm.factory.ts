import { GeminiProvider } from "./gemini.provider";
import { GroqProvider } from "./groq.provider";
import { LLMProvider } from "./llm.provider";

export const getProvider = (): LLMProvider => {
  switch (process.env.LLM_PROVIDER) {
    case "groq":
      return new GroqProvider();

    case "gemini":
    default:
      return new GeminiProvider();
  }
};
