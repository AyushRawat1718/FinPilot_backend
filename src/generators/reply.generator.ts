import { EventData } from "../types/events.type";

export const generateReply = (event: EventData): string => {
  if (event.needsClarification) {
    return `Got it 👍

"${event.description}"

Could you tell me the amount? 😊`;
  }

  switch (event.type) {
    case "expense":
      return `Recorded ₹${event.amount} 👍

Expense: ${event.description}`;

    case "income":
      return `Recorded ₹${event.amount} 🎉

Income: ${event.description}`;

    case "goal":
      return `Goal noted 🎯

Target: ₹${event.amount}

${event.description}`;

    case "transfer":
      return `Recorded ₹${event.amount} 👍

Transfer: ${event.description}`;

    default:
      return `Got it 👍

${event.description}`;
  }
};
