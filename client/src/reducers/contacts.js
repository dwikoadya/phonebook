const contacts = (state = [], action) => {
  switch (action.type) {
    case "LOAD_CONTACT_SUCCESS":
      return action.users.map((item) => {
        item.sent = true;
        return item;
      });
  }
};

export default contacts;
