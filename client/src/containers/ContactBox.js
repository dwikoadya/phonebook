import React, { Component } from 'react'
import { connect } from 'react-redux'
import Jumbotron from '../components/layout/Jumbotron'
import ContactList from './ContactList'
import AddContact from '../components/form/AddContact'
import SearchContact from '../components/form/SearchContact'
import Pagination from '../components/Pagination'
class ContactBox extends Component {
  render() {
    return (
      <div className="jumbo">
        <Jumbotron />
        <div className="container">
          <div className="main-container">
            <div className="card-body">
              <div className="table-wrapper">
                <div className="card-body">
                  {this.props.stateFromMaps && <AddContact />}
                  <br />
                  <SearchContact />
                </div>
                <div className="card-body">
                  <ContactList />
                </div>
                <Pagination />
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }  
}

const mapStateToProps = ({ contacts }) => {
  const { isActive } = contacts
  return { stateFromMaps: isActive}
}

export default connect(
  mapStateToProps
)(ContactBox)