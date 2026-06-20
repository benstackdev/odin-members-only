import { Router } from "express";
import cors from "cors";
import { loginPost, signupPost, verifyTokenPost } from "../controllers/authController";

const authRouter = Router();

authRouter.post("/signup", signupPost);
authRouter.post("/login", loginPost);
authRouter.post("/verify", verifyTokenPost);

export default authRouter;
