import React, { Component } from "react";
import { connect } from "react-redux";
import { addContact, ToggleButtonCta } from "../../actions";

class AddContact extends Component {
  constructor(props) {
    super(props);
    this.state = {
      Name: "",
      Phone: "",
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleNameChange = this.handleNameChange.bind(this);
    this.handlePhoneChange = this.handlePhoneChange.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  handleNameChange(event) {
    this.setState({ Name: event.target.value });
  }

  handlePhoneChange(event) {
    this.setState({ Phone: event.target.value });
  }

  handleClick(event) {
    event.preventDefault();
    this.props.toggleButtonCta();
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
      <div className="card">
        <div className="card-header text-center font-weight-bold">
          Add New Contact
        </div>
        <div className="card-body">
          <form
            onSubmit={this.handleSubmit}
            className="form-inline justify-content-center"
          >
            <div className="form-group row">
              <label htmlFor="name" className="col-sm-2 col-form-label">
                Name
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="name"
                  name="name"
                  value={this.state.Name}
                  onChange={this.handleNameChange}
                  placeholder="Name"
                />
              </div>
            </div>
            <div className="form-group-row">
              <label htmlFor="phone" className="col-sm-2 col-form-label">
                Number
              </label>
              <div className="col-sm-10">
                <input
                  type="text"
                  className="form-control"
                  id="phone"
                  name="phone"
                  value={this.state.Phone}
                  onChange={this.handlePhoneChange}
                  placeholder="Phone Number"
                />
              </div>
            </div>
            <div className="form-group row align-self-center">
              <div className="col-sm-12">
                <button
                  type="button"
                  className="btn btn-warning btn-cancel float-right addc"
                  onClick={this.handleClick}
                >
                  <i className="fa fa-ban"></i>
                  Cancel
                </button>
                <button
                  type="submit"
                  className="btn btn-primary btn-add float-right addc"
                >
                  <i className="fa fa-floppy-o"></i>
                  Save
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = (dispatch) => ({
  addContact: (Name, Phone) => dispatch(addContact(Name, Phone)),
  toggleButtonCta: () => dispatch(ToggleButtonCta()),
});

export default connect(null, mapDispatchToProps)(AddContact);
