import { Router } from "express";
import {
    registerController,
    verifyController,
    loginController,
    getCurrentController,
    logoutController,
    updateAvatarController
} from "../controllers/authControllers.js";
import { loginSchema, registerSchema } from "../schemas/userSchemas.js";
import validateBody from "../helpers/validateBody.js";
import authenticate from "../middlewares/authenticate.js";
import upload from "../middlewares/upload.js";

const authRouter = Router();

authRouter.post("/register", validateBody(registerSchema), registerController);

authRouter.get("/verify/:verificationToken", verifyController);

authRouter.post("/login", validateBody(loginSchema), loginController);

authRouter.get("/current", authenticate, getCurrentController);

authRouter.post("/logout", authenticate, logoutController);

authRouter.patch("/avatars", authenticate, upload.single("avatar"), updateAvatarController);

export default authRouter;
