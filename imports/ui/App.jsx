import React, { Component } from 'react';
import PropTypes from 'prop-types'
import ReactDOM from 'react-dom';
import { Meteor } from 'meteor/meteor';
import { createContainer } from 'meteor/react-meteor-data';
 
import { Crossings } from '../api/crossings.js';
 
import Crossing from './Crossing.jsx';
import AccountsUIWrapper from './AccountsUIWrapper.jsx';
 
// App component - represents the whole app
class App extends Component {
  constructor(props) {
    super(props);
  }

  handleSubmit(event) {
    event.preventDefault();
 
    // Find the text field via the React ref
    const name = ReactDOM.findDOMNode(this.refs.newCrossingNameInput).value.trim();
    const lat = ReactDOM.findDOMNode(this.refs.latInput).value.trim();
    const lng = ReactDOM.findDOMNode(this.refs.lngInput).value.trim();
    
    Meteor.call('crossings.insert', {'name': name, 'lat':lat, 'lng':lng});
 
    // Clear form
    ReactDOM.findDOMNode(this.refs.newCrossingNameInput).value = '';
    ReactDOM.findDOMNode(this.refs.latInput).value = '';
    ReactDOM.findDOMNode(this.refs.lngInput).value = '';
  }

  renderCrossings() {
    return this.props.crossings.map((crossing) => {
      return (
        <Crossing
          key={crossing._id}
          crossing={crossing}
        />
      );
    });
  }
 
  render() {
    return (
      <div className="container">
        <header>
          <h1>Crossings</h1>

          <AccountsUIWrapper />

          { this.props.currentUser ?
            <form className="new-task" onSubmit={this.handleSubmit.bind(this)} >
              <input
                type="text"
                ref="newCrossingNameInput"
                placeholder="New Crossing Name"
              />
              <input
                type="text"
                ref="latInput"
                placeholder="Lat"
              />
              <input
                type="text"
                ref="lngInput"
                placeholder="Lng"
              />
              <button type="submit"/>
            </form> : ''
          }

        </header>
 
        <ul>
          {this.renderCrossings()}
        </ul>
      </div>
    );
  }
}

App.propTypes = {
  crossings: PropTypes.array.isRequired,
  currentUser: PropTypes.object,
};

export default createContainer(() => {
  Meteor.subscribe('crossings');

  return {
    crossings: Crossings.find({}, { sort: { createdAt: -1 } }).fetch(),
    currentUser: Meteor.user(),
  };
}, App);
