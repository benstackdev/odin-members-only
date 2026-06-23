import type { NextFunction, Request, Response } from "express";
import { getUserByUsername, postNewUser } from "../db/queries.ts";
import { generateToken } from "../utils/generateToken";
import { UserType } from "../types/UserType.type";
import { verifyPassword } from "../utils/verifyPassword.ts";
import bcrypt from "bcrypt";
import jwt, { JwtPayload } from "jsonwebtoken";

const SALT_ROUNDS = 10;

export const signupPost = async (req: Request, res: Response) => {
  try {
    // not worrying about data validation in this middleware function

    // check that username is free
    const userExists = await getUserByUsername(req.body.username);

    if (userExists) {
      return res.status(401).json({ error: `User ${req.body.username} already exists` });
    }

    // encrypt password with bcrypt
    bcrypt.hash(req.body.password, SALT_ROUNDS, async (error, hash) => {
      if (error) {
        throw error;
      }

      await postNewUser({
        username: req.body.username,
        password: hash
      } as UserType);
    });

    console.log(req.body.username);
    res.status(200).json({ success: true });
  } catch (error) {
    throw error;
  }
};

export const loginPost = async (req: Request, res: Response) => {
  try {
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
    };

    const queriedUserCredentials = await getUserByUsername(userCredentials.username);

    // Check user entry exists
    if (!queriedUserCredentials) {
      return res.status(401).json({ error: `User ${userCredentials.username} could not be found` });
    }

    // Check password (do not have to encrypt plaintext first)
    let passMatch = await verifyPassword(userCredentials.password, queriedUserCredentials.password);

    if (!passMatch) {
      return res.status(401).json({ error: `Password for ${userCredentials.username} is incorrect` });
    }

    // If all tests pass, generate token for the user
    const token = generateToken(userCredentials);

    if (token) {
      res.set("Access-Control-Allow-Origin", "http://localhost:5173");
      res.cookie("token", token, {
        maxAge: 3600000
      }).json({ token });
    } else {
      res.status(500).json({ error: "Token undefined" });
    }
  } catch (error) {
    throw error;
  }
};

export const verifyTokenPost = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const authHeader = req.headers['authorization'];
    // as auth header is of the form 'Bearer <token>'
    const token = authHeader && authHeader.split(' ')[1];
    if (!token) {
      return res.status(401).json({ message: "Missing token" });
    }

    let payload: string | JwtPayload | undefined;

    jwt.verify(token, process.env.JWT_SECRET as jwt.Secret, (err, decoded) => {
      if (err) {
        return res.status(403).json({ message: "Invalid or expired token" });
      }
      payload = decoded;
    });

    res.status(200).json({ message: "Token verified successfully", payload });

    next();

  } catch (error) {
    throw error;
  }
};