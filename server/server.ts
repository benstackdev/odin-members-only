import express from "express";
import cors from "cors";
import authRouter from "./routes/authRouter";
import dotenv from "dotenv";
import messagesRouter from "./routes/messagesRouter";

dotenv.config();

// Probably not ideal; redirect just by client port; URL is the same (localhost)
export const CLIENT_URL = "http://localhost:5173";

const app = express();
const PORT = 8080;

const corsOptions = {
  origin: CLIENT_URL,
  credentials: true
};

app.use(cors(corsOptions));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.use("/api/messages", messagesRouter);
app.get("/api", async (req, res) => res.json("Hello API"));

app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`Server listening on port ${PORT}: http://localhost:${PORT}`);
});
