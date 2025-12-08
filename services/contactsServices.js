import Contact from "../db/models/Contact.js";

export const listContacts = (where) => {
    return Contact.findAll({ where });
}

export const getContactById = (where) => {
    return Contact.findOne({ where });
}

export const addContact = (payload) => {
    return Contact.create(payload);
}

export const removeContact = async (where) => {
    const contact = await getContactById(where);
    if (!contact) {
        return null;
    }
    await contact.destroy();
    return contact;
}

export const updateContact = async (where, payload) => {
    const contact = await getContactById({ where });
    if (!contact) {
        return null;
    }
    await contact.update(payload);
    return contact;
}
