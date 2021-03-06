let globalState = {
  contacts: [],
  isActive: false,
  pages: 0,
  limit: 5,
  currentPage: 1,
  offset: 0,
  isSearchModeOn: false,
  searchName: "",
  searchPhone: "",
};

const contacts = (state = globalState, action) => {
  switch (action.type) {
    case "LOAD_CONTACT_SUCCESS":
      return {
        ...state,
        contacts: action.items.map((item) => {
          item.added = true;
          item.isEdit = false;
          return item;
        }),
        pages: Number(Math.ceil(action.result / state.limit)),
        result: Number(action.result),
      };

    case "ADD_CONTACT":
      return {
        ...state,
        contacts: [
          ...state.contacts,
          {
            Phone: action.Phone,
            Name: action.Name,
            added: true,
            isEdit: false,
            id: action.id,
          },
        ],
      };

    case "ADD_CONTACT_SUCCESS":
      return state;

    case "ADD_CONTACT_FAILURE":
      return {
        ...state,
        contacts: state.contacts.map((item) => {
          if (item.id === action.id) {
            item.added = false;
          }
          return item;
        }),
      };

    case "RESEND_CONTACT_SUCCESS":
      return {
        ...state,
        contacts: state.contacts.map((item) => {
          if (item.id === action.id) item.added = true;
          return item;
        }),
      };

    case "TOGGLE":
      return {
        ...state,
        isActive: !state.isActive,
      };

    case "EDIT_CLICK":
      return {
        ...state,
        contacts: state.contacts.map((item) => {
          if (item.id === action.id) {
            item.isEdit = true;
          }
          return item;
        }),
      };

    case "EDIT_CLICK_CANCEL":
      return {
        ...state,
        contacts: state.contacts.map((item) => {
          if (item.id === action.id) item.isEdit = false;
          return item;
        }),
      };

    case "DELETE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.filter((item) => item.id !== action.id),
      };

    case "UPDATE_CONTACT_SUCCESS":
      return state;

    case "UPDATE_CONTACT":
      return {
        ...state,
        contacts: state.contacts.map((item) => {
          if (item.id === action.id) {
            item.Name = action.Name;
            item.Phone = action.Phone;
            item.isEdit = false;
          }
          return item;
        }),
      };

    case "UPDATE_CONTACT_FAILURE":
      return {
        ...state,
        contacts: state.contacts.map((item) => {
          if (item.id === action.id) item.isEdit = false;
          return item;
        }),
      };

    case "DELETE_CONTACT_SUCCESS":
      return state;

    case "NEXT_PAGE":
      return {
        ...state,
        currentPage: state.currentPage + 1,
        offset: action.offset,
      };

    case "PREVIOUS_PAGE":
      return {
        ...state,
        currentPage: state.currentPage - 1,
        offset: action.offset,
      };

    case "SWITCH_PAGE":
      return {
        ...state,
        currentPage: action.switchToPage,
        offset: action.offset,
      };

    case "MODE_SEARCH_ACTIVE":
      return {
        ...state,
        isSearchModeOn: true,
        searchName: action.filter.name,
        searchPhone: action.filter.user,
      };

    case "MODE_SEARCH_INACTIVE":
      return {
        ...state,
        isSearchModeOn: false,
        searchName: "",
        searchPhone: "",
      };

    case "LOAD_CONTACT_FAILURE":
    case "DELETE_CONTACT_FAILURE":
    default:
      return state;
  }
};

export default contacts;
