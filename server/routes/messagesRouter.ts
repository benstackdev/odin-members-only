import { Router } from "express";
import { allMessagesGet, deleteMessagePost, newMessagePost } from "../controllers/messagesController";
import { verifyTokenPost } from "../controllers/authController";

const messagesRouter = Router();

messagesRouter.get("/get-messages", allMessagesGet);
messagesRouter.post("/add-message", verifyTokenPost, newMessagePost);
messagesRouter.post("/delete-message", verifyTokenPost, deleteMessagePost);

export default messagesRouter;