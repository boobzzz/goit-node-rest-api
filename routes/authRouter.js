import { Router } from "express";
import { loginController, registerController } from "../controllers/authControllers.js";
import { loginSchema, registerSchema } from "../schemas/userSchemas.js";
import validateBody from "../helpers/validateBody.js";

const authRouter = Router();

authRouter.post("/register", validateBody(registerSchema), registerController);

authRouter.post("/login", validateBody(loginSchema), loginController);

export default authRouter;
