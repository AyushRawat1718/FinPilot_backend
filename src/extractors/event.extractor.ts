import { fastExtractor } from "./fast.extractor";
import { aiExtractor } from "./ai.extractor";

export const extractEvent = async (message: string) => {
  const fastEvent = fastExtractor(message);

  if (fastEvent) {
    console.log("FAST EXTRACTOR");
    return fastEvent;
  }

  console.log("AI EXTRACTOR");

  return await aiExtractor(message);
};
