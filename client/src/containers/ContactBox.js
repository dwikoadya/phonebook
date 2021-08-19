import React, { Component } from 'react'
import { connect } from 'react-redux'
import Jumbotron from '../components/layout/Jumbotron'
import AddContact from '../components/form/AddContact'
import ContactList from './ContactList'

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
                </div>
                <div className="card-body">
                  <ContactList />
                </div>
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