import { getProvider } from "../llm/llm.factory";
import { EventData } from "../types/events.type";

export const aiExtractor = async (message: string): Promise<EventData> => {
  try {
    const provider = getProvider();

    return await provider.extract(message);
  } catch (error) {
    console.log(error);

    return {
      type: "unknown",
      amount: null,
      description: message,
      needsClarification: true,
      confidence: 0,
      source: "ai",
    };
  }
};
