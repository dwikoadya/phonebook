import React, { Component } from "react";
import { connect } from "react-redux";
import {
  loadContact,
  nextPage,
  prevPage,
  switchPage,
  searchContact,
} from "../actions";

class Pagination extends Component {
  handleClick = (event) => {
    const { currentPage, limit, searchName, searchPhone, isSearchModeOn } =
      this.props.stateFromMaps;

    if (event.target.name === "previousPage") {
      const offset = (currentPage - 2) * limit;
      if (isSearchModeOn) {
        this.props.searchContact(searchName, searchPhone, offset);
      } else {
        this.props.loadContact(offset);
      }
      this.props.clickPrevPage(offset);
    } else if (event.target.name === "nextPage") {
      const offset = currentPage * limit;
      if (isSearchModeOn) {
        this.props.searchContact(searchName, searchPhone, offset);
      } else {
        this.props.loadContact(offset);
      }
      this.props.clickNextPage(offset);
    } else {
      const offset = (event.target.id - 1) * limit;
      const switchToPage = Number(event.target.id);
      if (isSearchModeOn) {
        this.props.searchContact(searchName, searchPhone, offset);
      } else {
        this.props.loadContact(offset);
      }
      this.props.switchPage(offset, switchToPage);
    }
    event.preventDefault();
  };

  render() {
    const { currentPage, pages } = this.props.stateFromMaps;
    const iterator = [];

    for (let i = 0; i < pages; i++) {
      iterator.push(i);
    }
    return (
      <div id="pagination">
        <nav aria-label="...">
          <ul className="pagination justify-content-center">
            <li
              className={currentPage === 1 ? "page-item disabled" : "page-item"}
            >
              <button
                className="page-link"
                name="previousPage"
                value={currentPage - 1}
                onClick={this.handleClick}
              >
                Previous
              </button>
            </li>
            {iterator.map((e, index) => {
              return (
                <li
                  className={
                    currentPage === index + 1 ? "page-item active" : "page-item"
                  }
                  aria-current="page"
                  key={index + 1}
                >
                  <button
                    className="page-link"
                    id={index + 1}
                    name="pagi"
                    onClick={this.handleClick}
                  >
                    {index + 1}
                  </button>
                </li>
              );
            })}
            <li
              className={
                currentPage === pages ? "page-item disabled" : "page-item"
              }
            >
              <button
                className="page-link"
                href="/#"
                name="nextPage"
                onClick={this.handleClick}
              >
                Next
              </button>
            </li>
          </ul>
        </nav>
      </div>
    );
  }
}

const mapStateToProps = ({ contacts }) => ({ stateFromMaps: contacts });
const mapDispatchToProps = (dispatch) => ({
  loadContact: (offset) => dispatch(loadContact(offset)),
  clickNextPage: (offset) => dispatch(nextPage(offset)),
  clickPrevPage: (offset) => dispatch(prevPage(offset)),
  switchPage: (offset, switchToPage) =>
    dispatch(switchPage(offset, switchToPage)),
  searchContact: (name, phone, offset) =>
    dispatch(searchContact(name, phone, offset)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Pagination);
