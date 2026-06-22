import { Router } from "express";
import { allMessagesGet } from "../controllers/messagesController";

const messagesRouter = Router();

messagesRouter.get("/get-messages", allMessagesGet);

export default messagesRouter;