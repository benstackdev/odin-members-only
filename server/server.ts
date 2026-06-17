import express from "express";
import cors from "cors";
import { getUserById } from "./db/queries";
import authRouter from "./routes/authRouter";
import dotenv from "dotenv";

dotenv.config();

const app = express();
const PORT = 8080;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/auth", authRouter);
app.get("/api", async (req, res) => res.json(await getUserById(1)));

app.listen(PORT, (error) => {
  if (error) throw error;
  console.log(`Server listening on port ${PORT}: http://localhost:${PORT}`);
});
