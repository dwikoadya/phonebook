import React, { Component } from "react";
import { connect } from "react-redux";
import { addContact } from "../actions";

class ContactForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      Phone: "",
    };

    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  handleNameChange(event) {
    this.setState({ Name: event.target.value });
  }

  handlePhoneChange(event) {
    this.setState({ Phone: event.target.value });
  }

  handleSubmit(event) {
    if (this.state.Name && this.state.Phone) {
      this.props.addContact(this.state.Name, this.state.Phone);
      this.setState({ Name: "", Phone: "" });
    }
    event.preventDefault();
  }

  render() {
    return (
      <form onSubmit={this.handleSubmit}>
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
              placeholder="Name"
            />
          </div>
        </div>
        <div className="form-group-row">
          <label htmlFor="Phone" className="col-sm-2 col-form-label">
            Phone
          </label>
          <div className="col-sm-10">
            <input
              type="text"
              className="form-control"
              id="Phone"
              name="Phone"
              value={this.state.Phone}
              onChange={this.handlePhoneChange}
              placeholder="Phone"
            />
          </div>
        </div>
        <div className="form-group-row">
          <div className="col-sm-10">
            <button type="submit" className="btn btn-primary">
              Add Contact
            </button>
          </div>
        </div>
      </form>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addContact: (Name, Phone) => dispatch(addContact(Name, Phone)),
});

export default connect(null, mapDispatchToProps)(ContactForm);
