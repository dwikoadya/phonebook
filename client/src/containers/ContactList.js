import React, { Component } from "react";
import { connect } from "react-redux";
import Contact from "./ContactActive";
import EditContact from "../components/form/EditContact";
import { loadContact } from "../actions";

class ContactList extends Component {
  componentDidMount() {
    this.props.loadContact();
  }

  render() {
    const nodes = this.props.stateFromMaps.contacts.map((item, index) => {
      return item.isEdit ? (
        <EditContact
          key={index}
          index={this.props.stateFromMaps.offset + index + 1}
          user={item.Phone}
          Name={item.Name}
          added={item.added}
          id={item.id}
          edit={item.isEdit}
        />
      ) : (
        <Contact
          key={index}
          index={this.props.stateFromMaps.offset + index + 1}
          user={item.Phone}
          Name={item.Name}
          added={item.added}
          id={item.id}
          edit={item.isEdit}
        />
      );
    });
    return (
      <div>
        <table className="table table-stripped table-light centering table-hover">
          <thead className="thead-dark">
            <tr className="table-secondary">
              <th scope="col">No</th>
              <th scope="col">Name</th>
              <th scope="col">Phone</th>
              <th scope="col">Actions</th>
            </tr>
          </thead>
          <tbody>
            {nodes}
          </tbody>
        </table>
      </div>
    );
  }
}

const mapStateToProps = ({ contacts }) => ({ stateFromMaps: contacts })
const mapDispatchtoProps = dispatch => ({ loadContactFromMap: () => dispatch(loadContact())})

export default connect(
  mapStateToProps,
  mapDispatchtoProps
)(ContactList)