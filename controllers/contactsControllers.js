import {
    listContacts,
    getContactById,
    addContact,
    removeContact,
    updateContact
} from "../services/contactsServices.js";
import HttpError from "../helpers/HttpError.js";


export const getContactsController = async (req, res, next) => {
    try {
        const { id: owner } = req.user;
        const result = await listContacts({ owner });
        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const getContactController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { id: owner } = req.user;
        const result = await getContactById({ id, owner });

        if (!result) {
            throw HttpError(404);
        }

        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const deleteContactController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { id: owner } = req.user;
        const result = await removeContact({ id, owner });

        if (!result) {
            throw HttpError(404);
        }

        res.json(result);
    } catch (error) {
        next(error);
    }
};

export const createContactController = async (req, res, next) => {
    try {
        const { id: owner } = req.user;
        const result = await addContact({ ...req.body, owner });

        res.status(201).json(result);
    } catch (error) {
        next(error);
    }
};

export const updateContactController = async (req, res, next) => {
    try {
        const { id } = req.params;
        const { id: owner } = req.user;
        const result = await updateContact({ id, owner }, req.body);

        if (!result) {
            throw HttpError(404);
        }

        res.json(result);
    } catch (error) {
        next(error);
    }
};
