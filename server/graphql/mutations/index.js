const addContact = require("./add").add;
const updateContact = require("./update").update;
const removeContact = require("./remove").remove;

module.exports = {
  addContact,
  updateContact,
  removeContact,
};
