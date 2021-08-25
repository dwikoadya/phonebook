import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import Swal from "sweetalert2";

const API_URL = `http://localhost:3001/graphql/`;

const client = new ApolloClient({
  uri: API_URL,
});

//Start Load Data
export const loadContactSuccess = (phones) => ({
  type: "LOAD_CONTACT_SUCCESS",
  phones,
});

export const loadContactFailure = () => ({
  type: "LOAD_CONTACT_FAILURE",
});

export const loadContact = (offset = 0, limit = 5) => {
  const contactQuery = gql`
    query {
      phones(pagination: {offset: ${offset}, limit: ${limit}}) {
        result
        items{
          id
          Name
          Phone
        }
      }
    }
  `;
  return (dispatch) => {
    return client
      .query({
        query: contactQuery,
      })
      .then(function (response) {
        dispatch(loadContactSuccess(response.data.phones));
      })
      .catch(function (error) {
        console.log(error);
        dispatch(loadContactFailure());
      });
  };
};
//End Load Data

// Start Search Data
export const searchContact = (name, phone, offset = 0, limit = 5) => {
  const searchQuery = gql`
    query contacts($name: String, $phone: String, $offset: int, $limit: int) {
      contacts(
        name: $name
        phone: $phone
        pagination: { offset: $offset, limit: $limit }
      ) {
        result
        items {
          id
          Name
          Phone
        }
      }
    }
  `;
  return (dispatch) => {
    return client
      .query({
        query: searchQuery,
        variables: {
          name,
          phone,
          offset,
          limit,
        },
      })
      .then((response) => {
        dispatch(loadContactSuccess(response.data.contacts));
      })
      .catch((error) => {
        console.log(error);
        dispatch(loadContactFailure());
      });
  };
};

export const searchMode = (filter) => ({
  type: "MODE_SEARCH_ACTIVE",
  filter,
});

export const cancelSearch = () => ({
  type: "MODE_SEARCH_INACTIVE",
});
// End Search Data

// Start Add Data
export const addContactSuccess = (contacts) => ({
  type: "ADD_CONTACT_SUCCESS",
  contacts,
});

export const addContactFailure = (id) => ({
  type: "ADD_CONTACT_FAILURE",
  id,
});

const addContactRedux = (Phone, Name, id) => ({
  type: "ADD_CONTACT",
  Phone,
  Name,
  id,
});

export const addContact = (Phone, Name) => {
  const id = Date.now();
  const addQuery = gql`
    mutation addContact($Name: String!, $Phone: String!, $id: ID!) {
      addContact(Name: $Name, Phone: $Phone, id: $id) {
        Name
        Phone
        id
      }
    }
  `;
  return (dispatch) => {
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Contact added successfully!",
      showConfirmButton: false,
      timer: 1200,
    }).then(() => {
      dispatch(addContactRedux(Phone, Name, id));
      return client
        .mutate({
          mutation: addQuery,
          variables: {
            Name,
            Phone,
            id,
          },
        })
        .then(function (response) {
          dispatch(addContactSuccess(response.data.addContact));
        })
        .catch(function (error) {
          Swal.fire({
            icon: "warning",
            title: "Network connection failed!",
            text: "Click resend button to add your contact!",
            type: "warning",
            button: true,
            dangerMode: true,
            timer: 1500,
          }).then(() => {
            dispatch(addContactFailure(id));
          });
        });
    });
  };
};
// End Add Data

// Start Delete Data
const deleteContactRedux = (id) => ({
  type: "DELETE_CONTACT",
  id,
});

export const deleteContactSuccess = (contacts) => ({
  type: "DELETE_CONTACT_SUCCESS",
  contacts,
});

export const deleteContactFailure = () => ({
  type: "DELETE_CONTACT_FAILURE",
});

export const deleteContact = (id) => {
  const deleteQuery = gql`
    mutation removeContact($id: ID!) {
      removeContact(id: $id) {
        id
      }
    }
  `;
  return (dispatch) => {
    Swal.fire({
      icon: "warning",
      title: "Are you sure delete this contact?",
      text: "You can't revert this action",
      type: "warning",
      showCancelButton: true,
      confirmButtonText: "Yes, Delete It!",
      cancelButtonText: "No, Keep It!",
      showCloseButton: true,
      showLoaderOnConfirm: true,
    }).then((result) => {
      if (result.value) {
        dispatch(deleteContactRedux(id));
        return client
          .mutate({
            mutation: deleteQuery,
            variables: {
              id,
            },
          })
          .then(function (response) {
            dispatch(deleteContactSuccess(response));
          })
          .catch(function (error) {
            console.log(error);
            dispatch(deleteContactFailure());
          });
      }
    });
  };
};
// End Delete

// Start Resend Data
const resendContactSuccess = (id) => ({
  type: "RESEND_CONTACT_SUCCESS",
  id,
});

export const resendContact = (Phone, Name, id) => {
  const addQuery = gql`
    mutation addContact($Phone: String!, $Name: String!, $id: ID!) {
      addContact(Phone: $Phone, Name: $Name, id: $id) {
        Phone
        Name
      }
    }
  `;
  return (dispatch) => {
    return client
      .mutate({
        mutation: addQuery,
        variables: {
          Phone,
          Name,
          id,
        },
      })
      .then(function (response) {
        console.log(response);
        dispatch(resendContactSuccess(id));
      })
      .catch(function (error) {
        console.log(error);
        dispatch(addContactFailure(id));
      });
  };
};

const toggleThisButton = () => ({
  type: "TOGGLE",
});

export const ToggleButtonCta = () => {
  return (dispatch) => {
    dispatch(toggleThisButton());
  };
};

const clickEdit = (id) => ({
  type: "EDIT_CLICK",
  id,
});

export const clickEditAct = (id) => {
  return (dispatch) => {
    dispatch(clickEdit(id));
  };
};

const cancelEdit = (id) => ({
  type: "EDIT_CLICK_CANCEL",
  id,
});

export const clickCancelEditAct = (id) => {
  return (dispatch) => {
    dispatch(cancelEdit(id));
  };
};

updateRedux = (Phone, id, Name) => ({
  type: "UPDATE_CONTACT",
  id,
  Phone,
  Name,
});

const updateContactSuccess = (phone) => ({
  type: "UPDATE_CONTACT_SUCCESS",
  phone,
});

const updateContactFailure = (id) => ({
  type: "UPDATE_CONTACT_FAILURE",
  id,
});

export const editUpdateContact = (Phone, id, Name) => {
  const updateQuery = gql`
    mutation updateContact($Phone: String!, $Name: String!, $id: ID!) {
      updateContact(Phone: $Phone, Name: $Name, id: $id) {
        Phone
        Name
        id
      }
    }
  `;
  return (dispatch) => {
    dispatch(updateRedux(Phone, id, Name));
    Swal.fire({
      position: "center",
      icon: "success",
      title: "Contact updated successfully!",
      showConfirmButton: false,
      timer: 1200,
    })
      .then(() => {
        return client.mutate({
          mutation: updateQuery,
          variables: {
            Phone,
            Name,
            id,
          },
        });
      })
      .then(function (response) {
        dispatch(updateContactSuccess(response.data));
      })
      .catch(function (error) {
        Swal.fire({
          icon: "warning",
          title: "Network connection failed!",
          text: "Failed to update contact!",
          type: "warning",
          buttons: true,
          dangerMode: true,
          timer: 1500,
        }).then(() => {
          dispatch(updateContactFailure(id));
        });
      });
  };
};

export const nextPage = (offset) => ({
  type: "NEXT_PAGE",
  offset,
});

export const prevPage = (offset) => ({
  type: "PREVIOUS_PAGE",
  offset,
});

export const switchPage = (offset, switchToPage) => ({
  type: "SWITCH_PAGE",
  offset,
  switchToPage,
});
