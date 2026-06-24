import type { Request, Response } from "express";
import { addNewMessage, deleteMessage, getAllMessages } from "../db/queries";

export const allMessagesGet = async (req: Request, res: Response) => {
  try {
    const messageList = await getAllMessages();
    if (messageList) {
      res.status(200).json(messageList);
    } else {
      res.status(500).json({ error: "Internal server error: messages could not be found" });
    }
  } catch (error) {
    throw error;
  }
};

export const newMessagePost = async (req: Request, res: Response) => {
  try {
    if (!req.body.username) res.status(404).json({ error: "User not found" });
    if (!req.body.message) res.status(404).json({ error: "Message content not found" });

    await addNewMessage(req.body.username, req.body.message);
    res.status(200).json({ success: "ok" });
  } catch (error) {
    throw error;
  }
};

export const deleteMessagePost = async (req: Request, res: Response) => {
  try {
    if (!req.body.username) return res.status(404).json({ error: "Username unknown" });
    if (!req.body.message) return res.status(404).json({ error: "Message unknown" });

    await deleteMessage(req.body.username, req.body.message);
    res.status(200).json({ success: "ok" });

  } catch (error) {
    throw error;
  }
};