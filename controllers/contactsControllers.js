import {
    listContacts,
    getContactById,
    removeContact,
    addContact,
    changeContact
} from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";


export const getAllContacts = async (req, res, next) => {
    try {
        const result = await listContacts();
        res.json(result);
    } catch (error) {
        next(HttpError(error.status, error.message));
    }
};

export const getOneContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await getContactById(id);

        if (!result) {
            throw HttpError(404);
        }

        res.json(result);
    } catch (error) {
        next(HttpError(error.status, error.message));
    }
};

export const deleteContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await removeContact(id);

        if (!result) {
            throw HttpError(404);
        }

        res.json(result);
    } catch (error) {
        next(HttpError(error.status, error.message));
    }
};

export const createContact = async (req, res, next) => {
    try {
        const { name, email, phone } = req.body;
        const result = await addContact(name, email, phone);

        res.status(201).json(result);
    } catch (error) {
        next(HttpError(error.status, error.message));
    }
};

export const updateContact = async (req, res, next) => {
    try {
        const { id } = req.params;
        const result = await changeContact(id, req.body);

        if (!result) {
            throw HttpError(404);
        }

        res.json(result);
    } catch (error) {
        next(HttpError(error.status, error.message));
    }
};
