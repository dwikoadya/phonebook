import ApolloClient from "apollo-boost";
import gql from "graphql-tag";
import Swal from "sweetalert2";

const API_URL = `http://localhost:3001/graphql`;

const client = new ApolloClient({
  uri: API_URL,
});

export const loadContactSuccess = ({ result, item }) => ({
  type: "LOAD_CONTACT_SUCCESS",
  result,
  item,
});

export const loadContactFailure = () => ({
  type: "LOAD_USER_FAILURE",
});

export const loadContact = () => {
  const contactQuery = gql`
    query {
      users {
        id
        Name
        Phone
      }
    }
  `;
  return (dispatch) => {
    return client
      .query({
        query: contactQuery,
      })
      .then(function (response) {
        console.log(response);
        dispatch(loadContactSuccess(response.data.users));
      })
      .catch(function (error) {
        console.log(error);
        dispatch(loadContactFailure());
      });
  };
};
