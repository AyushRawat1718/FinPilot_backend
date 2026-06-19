import { EventData } from "../types/events.type";

export interface LLMProvider {
  extract(message: string): Promise<EventData>;
}
