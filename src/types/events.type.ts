export type EventType = "expense" | "income" | "goal" | "transfer" | "unknown";
export type SourceType = "fast" | "gemini" | "groq" | "deepseek";

export interface EventData {
  type: EventType;
  amount: number | null;
  description: string;
  confidence: number;
  needsClarification: boolean;
  source: SourceType;
}
