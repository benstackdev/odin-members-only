import type { Request, Response } from "express";
import { getAllMessages } from "../db/queries";

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