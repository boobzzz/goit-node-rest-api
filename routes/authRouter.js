import { Router } from "express";
import { registerController, loginController, getCurrentController } from "../controllers/authControllers.js";
import { loginSchema, registerSchema } from "../schemas/userSchemas.js";
import validateBody from "../helpers/validateBody.js";
import authenticate from "../middlewares/authenticate.js";

const authRouter = Router();

authRouter.post("/register", validateBody(registerSchema), registerController);

authRouter.post("/login", validateBody(loginSchema), loginController);

authRouter.get("/current", authenticate, getCurrentController);

export default authRouter;
