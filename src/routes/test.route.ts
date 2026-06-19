import { Router } from "express";
import { sendMessage } from "../services/whatsapp.service";

const router = Router();

router.get("/test", async (_, res) => {
  await sendMessage("919354356932", "Hello from FinPilot 🚀");

  res.send("Done");
});

export default router;
