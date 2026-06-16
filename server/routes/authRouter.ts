import { Router } from "express";

const authRouter = Router();

authRouter.get("/", (req, res) => res.json("Welcome to the auth router"));
// authRouter.post("/signup")
// authRouter.post("/login")

export default authRouter;
