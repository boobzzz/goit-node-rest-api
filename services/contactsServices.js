import Contact from "../db/models/Contact.js";

export const listContacts = () => {
    return Contact.findAll();
}

export const getContactById = (contactId) => {
    return Contact.findByPk(contactId);
}

export const addContact = (payload) => {
    return Contact.create(payload);
}

export const removeContact = async (contactId) => {
    const contact = await getContactById(contactId);
    if (!contact) {
        return null;
    }
    await contact.destroy();
    return contact;
}

export const changeContact = async (contactId, payload) => {
    const contact = await getContactById(contactId);
    if (!contact) {
        return null;
    }
    await contact.update(payload);
    return contact;
}
