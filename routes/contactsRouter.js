import { Router } from "express";
import {
    getContactsController,
    getContactController,
    createContactController,
    deleteContactController,
    updateContactController
} from "../controllers/contactsControllers.js";
import authenticate from "../middlewares/authenticate.js";
import validateBody from "../helpers/validateBody.js";
import {
    createContactSchema,
    updateContactSchema,
    updateStatusSchema
} from "../schemas/contactsSchemas.js";

const contactsRouter = Router();

contactsRouter.use(authenticate);

contactsRouter.get("/", getContactsController);

contactsRouter.get("/:id", getContactController);

contactsRouter.delete("/:id", deleteContactController);

contactsRouter.post("/", validateBody(createContactSchema), createContactController);

contactsRouter.put("/:id", validateBody(updateContactSchema), updateContactController);

contactsRouter.put("/:id/favorite", validateBody(updateStatusSchema), updateContactController);

export default contactsRouter;
