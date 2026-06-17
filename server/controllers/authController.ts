import type { Request, Response } from "express"
import { getUserByUsername } from "../db/queries.ts";
import { generateToken } from "../utils/generateToken";
import { UserType } from "../types/UserType.type";

export const loginPost = async (req: Request, res: Response) => {
  try {
    console.log(req);
    // Check username and password exist
    if (!req.body.username) {
      return res.status(401).json({ error: "Username unknown" });
    }

    if (!req.body.password) {
      return res.status(401).json({ error: "Password unknown" });
    }

    // Verify credentials (password stored as plaintext for now)
    const userCredentials: UserType = {
      username: req.body.username,
      password: req.body.password
    }

    const queriedUserCredentials = await getUserByUsername(userCredentials.username);

    // Check user entry exists
    if (!queriedUserCredentials) {
      return res.status(401).json({ error: `User ${userCredentials.username} could not be found` });
    }

    // Check password (implement with bcrypt later)
    if (userCredentials.password !== queriedUserCredentials.password) {
      return res.status(401).json({ error: `Incorrect password for ${userCredentials.username}` });
    }

    // If all tests pass, generate token for the user
    const token = generateToken(userCredentials);

    res.json(token);
  } catch (error) {
    throw error;
  }
}
