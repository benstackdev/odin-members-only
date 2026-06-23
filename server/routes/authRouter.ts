import { Router } from "express";
import { isAdminGet, loginPost, signupPost, verifyTokenPost } from "../controllers/authController";

const authRouter = Router();

authRouter.get("/is-admin", isAdminGet);
authRouter.post("/signup", signupPost);
authRouter.post("/login", loginPost);
authRouter.post("/verify", verifyTokenPost);

export default authRouter;
