import { EventData } from "../types/events.type";

export const fastExtractor = (message: string): EventData | null => {
  const lower = message.toLowerCase();

  const match = lower.match(/(\d+(\.\d+)?)\s*(k|lakh|lakhs)?/);

  if (!match) return null;

  let amount = Number(match[1]);

  const suffix = match[3];

  if (suffix === "k") amount *= 1000;

  if (suffix === "lakh" || suffix === "lakhs") amount *= 100000;

  return {
    type: "expense",
    amount,
    description: message.replace(match[0], "").trim(),
    confidence: 1,
    needsClarification: false,
    source: "fast",
  };
};
