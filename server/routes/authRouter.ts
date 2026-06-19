import { Router } from "express";
import cors from "cors";
import { loginPost, signupPost } from "../controllers/authController";

const authRouter = Router();

authRouter.post("/signup", signupPost);
authRouter.post("/login", loginPost);

export default authRouter;
