import fs from "node:fs/promises";
import path from 'path';
import { nanoid } from 'nanoid';

import Contact from "../db/models/Contact.js";

const contactsPath = path.resolve('db', 'contacts.json');

// export async function listContacts() {
//     const json = await fs.readFile(contactsPath, 'utf8');
//     return JSON.parse(json);
// }

export async function listContacts() {
    return Contact.findAll();
}

export async function getContactById(contactId) {
    const contacts = await listContacts();
    return contacts.find((contact) => contact.id === contactId);
}

export async function removeContact(contactId) {
    const contacts = await listContacts();
    if (contacts.length === 0) {
        return null;
    }
    const updated = contacts.filter((contact) => contact.id !== contactId);
    await fs.writeFile(contactsPath, JSON.stringify(updated, null, 2), 'utf8');
    return updated;
}

export async function addContact(name, email, phone) {
    const contacts = await listContacts();
    const newContact = {
        id: nanoid(),
        name,
        email,
        phone
    };
    contacts.push(newContact);
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2), 'utf8');
    return newContact;
}

export async function changeContact(contactId, data) {
    let contacts = await listContacts();
    const index = contacts.findIndex((contact) => contact.id === contactId);
    if (index === -1) {
        return null;
    }
    contacts[index] = { ...contacts[index], ...data };
    await fs.writeFile(contactsPath, JSON.stringify(contacts, null, 2));
    return contacts[index];
}
