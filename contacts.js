const fs = require('fs/promises');
const path = require('path');

const contactsPath = path.join(__dirname, './db/contacts.json');

// TODO: задокументировать каждую функцию
const listContacts = async () => {
  try {
    const data = await fs.readFile(contactsPath);
    const contacts = JSON.parse(data);
    return contacts;
  } catch (error) {
    console.error(err.message);
  }
};

const getContactById = async id => {
  try {
    const contactsList = await listContacts();
    const contact = contactsList.find(contact => contact.id === id);
    return contact;
  } catch (error) {
    console.error(err.message);
  }
  
};

const removeContact = async id => {
  try {
    const contactsList = await listContacts();
    const contactIndex = contactsList.findIndex(contact => contact.id === id);
    const updatedContacts = contactsList.filter(contact => contact.id !== id);
    await fs.writeFile(contactsPath, JSON.stringify(updatedContacts, null, 2));
    return contactsList[contactIndex];
  } catch (error) {
    console.error(err.message);
  }
};

const addContact = async contactInfo => {
  try {
    const contactsList = await listContacts();
    const newId = `${
      Number(
        [...contactsList].sort(
          (contact1, contact2) => contact1.id - contact2.id,
        )[contactsList.length - 1].id,
      ) + 1
    }`;
    const newContact = { ...contactInfo, id: newId };
    await fs.writeFile(
      contactsPath,
      JSON.stringify([...contactsList, newContact], null, '\t'),
    );
    return newContact;
  } catch (error) {
    console.error(err.message);
  }
};

module.exports =  { listContacts, getContactById, removeContact, addContact };