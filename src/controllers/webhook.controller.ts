import { Request, Response } from "express";
import { sendMessage } from "../services/whatsapp.service";
import { extractEvent } from "../extractors/event.extractor";
import { generateReply } from "../generators/reply.generator";

export const verifyWebhook = (req: Request, res: Response) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === process.env.VERIFY_TOKEN) {
    console.log("Webhook verified");
    return res.status(200).send(challenge);
  }

  return res.sendStatus(403);
};

export const receiveMessage = async (req: Request, res: Response) => {
  try {
    const message = req.body.entry?.[0]?.changes?.[0]?.value?.messages?.[0];

    if (!message) {
      return res.sendStatus(200);
    }

    const from = message.from;
    const text = message.text?.body;

    if (!text) {
      return res.sendStatus(200);
    }

    console.log("From:", from);
    console.log("Message:", text);

    // Handle multiline messages
    const messages = text
      .split("\n")
      .map((lines: string) => lines.trim())
      .filter(Boolean);

    for (const msg of messages) {
      const event = await extractEvent(msg);

      console.log("Extracted Event:", JSON.stringify(event, null, 2));

      const reply = generateReply(event);

      await sendMessage(from, reply);
    }

    return res.sendStatus(200);
  } catch (error) {
    console.log("Webhook Error:", error);

    return res.sendStatus(500);
  }
};
