import React, { Component } from "react";
import { connect } from "react-redux";
import { ToggleButtonCta } from "../../actions";

class Jumbotron extends Component {
  handleClick = (event) => {
    event.preventDefault();
    this.props.toggleButtonCta();
  };

  render() {
    return (
      <div>
        <nav className="navbar navbar-expand-lg navbar-light">
          <div className="containers">
            <h6 className="navbar-brand">Welcome...</h6>
          </div>
        </nav>
        <div className="jumbotron jumbotron-fluid">
          <div className="containers">
            <h1 className="display-4">Phone Book</h1>
            <p className="lead float-left">
              Telephone books are, like dictionaries, already out of date the
              moment they are printed....
            </p>
            <button
              type="submit"
              className="btn btn-lg btn-outline-primary float-left add"
              onClick={this.handleClick}
              name="button"
            >
              <i className="fa fa-address-book-o"></i>
              Add New Contacts
            </button>
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = ({ contacts }) => {
  const { isActive } = contacts;
  return { stateFromMaps: isActive };
};

const mapDispatchToProps = (dispatch) => ({
  toggleButtonCta: () => dispatch(ToggleButtonCta()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Jumbotron);
