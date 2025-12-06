import { Router } from "express";
import {
    getAllContacts,
    getOneContact,
    createContact,
    deleteContact,
    updateContact
} from "../controllers/contactsControllers.js";
import validateBody from "../helpers/validateBody.js";
import {
    createContactSchema,
    updateContactSchema,
    updateStatusSchema
} from "../schemas/contactsSchemas.js";

const contactsRouter = Router();

contactsRouter.get("/", getAllContacts);

contactsRouter.get("/:id", getOneContact);

contactsRouter.delete("/:id", deleteContact);

contactsRouter.post("/", validateBody(createContactSchema), createContact);

contactsRouter.put("/:id", validateBody(updateContactSchema), updateContact);

contactsRouter.put("/:id/favorite", validateBody(updateStatusSchema), updateContact);

export default contactsRouter;
