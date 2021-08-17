const firebase = require("firebase");

const getContacts = () => {
  const contactReference = firebase.database().ref("/Phones");
  return new Promise((resolve, reject) => {
    contactReference.on(
      "value",
      function (snapshot) {
        const folders = snapshot.val();
        if (folders === null) {
          resolve([]);
        } else {
          const data = Object.keys(folders).map((item) =>
            Object.assign({ id: item }, folders[item])
          );
          resolve(data);
        }
        contactReference.off("value");
      },
      (errorObject) => {
        console.log(`The read failed: ${errorObject.code}`);
        reject(`The read failed: ${errorObject.code}`);
      }
    );
  });
};

const createContact = (contact) => {
  const referencePath = `/Phones/${contact.id}`;
  const contactReference = firebase.database().ref(referencePath);
  return new Promise((resolve, reject) => {
    contactReference.set({ Name: contact.Name, Phone: contact.Phone }, (error) => {
      if (error) {
        reject(`Data could not be created ${error}`);
      } else {
        resolve(contact);
      }
    });
  });
};

const updateContact = (contact) => {
  const referencePath = `/Phones/${contact.id}`;
  const contactReference = firebase.database().ref(referencePath);
  return new Promise((resolve, reject) => {
    contactReference.update(
      { Name: contact.Name, Phone: contact.Phone },
      (error) => {
        if (error) {
          reject(`Data could not be updated ${error}`);
        } else {
          resolve(contact);
        }
      }
    );
  });
};

const deleteContact = (contact) => {
  const referencePath = `/Phones/${contact.id}`;
  const  contactReference = firebase.database().ref(referencePath);
  return new Promise((resolve, reject) => {
    contactReference.remove((error) => {
      if (error) {
        reject(`Data could not be deleted ${error}`);
      } else {
        resolve(contact);
      }
    });
  });
};

module.exports = { getContacts, createContact, updateContact, deleteContact };
