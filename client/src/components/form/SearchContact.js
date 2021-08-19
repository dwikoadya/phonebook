import React, { Component } from "react";
import { connect } from "react-redux";
import {
  addContact,
  searchContact,
  searchMode,
  loadContact,
  cancelSearch,
} from "../../actions";

class SearchContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      Phone: "",
    };
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handlePhoneChange(event) {
    this.setState({ Phone: event.target.value });
    this.props.searchContact(this.state.Name, event.target.value);
    this.props.searchMode({ name: this.state.Name, Phone: event.target.value });
  }

  handleNameChange(event) {
    this.setState({ Name: event.target.value });
    this.props.searchContact(event.tartget.value, this.state.Phone);
    this.props.searchMode({
      name: event.target.value,
      phone: this.state.phone,
    });
  }

  handleClick(event) {
    this.props.loadContact();
    this.props.cancelSearch();
    this.setState({ Name: "", Phone: "" });
    event.preventDefault();
  }

  render() {
    return (
      <div className="card text-left">
        <div className="card-header text-center font-weight-bold">
          Search Contact
        </div>
        <div className="card-body">
          <form className="form-inline justify-content-center">
            <div className="form-group row">
              <label htmlFor="Name" className="col-sm-2 col-form-label">
                Name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="Name"
                  name="Name"
                  value={this.state.Name}
                  onChange={this.handleNameChange}
                  placeholder="Search Name"
                />
              </div>
            </div>
            <div className="form-group row">
              <label htmlFor="phone" className="col-sm-2 col-form-label">
                Phone
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={this.state.Phone}
                  onChange={this.handlePhoneChange}
                  placeholder="Search Number"
                />
              </div>
            </div>
            <div className="form-group row align-self-center">
              <div className="col-sm-12">
                <button
                  type="button"
                  className="btn btn-outline-warning btn-cancel float-right reset"
                  onClick={this.handleClick}
                >
                  <i className="fa fa-refresh"></i>
                  Reset
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

mapDispatchtoProps = (dispatch) => ({
  addContact: (phone, Name, id) => dispatch(addContact(phone, Name, id)),
  searchContact: (name, phone) => dispatch(searchContact(name, phone)),
  searchMode: (filter) => dispatch(searchMode(filter)),
  loadContact: () => dispatch(loadContact()),
  cancelSearch: () => dispatch(cancelSearch()),
});

export default connect(null.mapDispatchtoProps)(SearchContact);
