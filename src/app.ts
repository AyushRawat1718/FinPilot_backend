import express from "express";
import cors from "cors";
import testRoute from "./routes/test.route";
import webhookRoutes from "./routes/webhook.route";

const app = express();

app.use(cors());
app.use(express.json());
app.use("/test", testRoute);
app.use("/webhook", webhookRoutes);

export default app;
