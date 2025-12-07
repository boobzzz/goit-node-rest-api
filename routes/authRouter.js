import { Router } from "express";
import { registerController } from "../controllers/authControllers.js";
import { registerSchema } from "../schemas/userSchemas.js";
import validateBody from "../helpers/validateBody.js";

const authRouter = Router();

authRouter.post("/register", validateBody(registerSchema), registerController);

export default authRouter;
