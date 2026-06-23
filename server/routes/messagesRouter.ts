import { Router } from "express";
import { allMessagesGet, newMessagePost } from "../controllers/messagesController";
import { verifyTokenPost } from "../controllers/authController";

const messagesRouter = Router();

messagesRouter.get("/get-messages", allMessagesGet);
messagesRouter.post("/add-message", verifyTokenPost, newMessagePost);

export default messagesRouter;