import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
 
// Crossing component - represents a single todo item
export default class Crossing extends Component {
  setStatus(e) {
    // Set the checked property to the opposite of its current value
    Meteor.call('crossings.setStatus', this.props.crossing._id, e.target.value);
  }
 
  deleteThisCrossing() {
    Meteor.call('crossings.remove', this.props.crossing._id);
  }

  render() {
    const crossingClassName = classnames({
      status: this.props.crossing.status,
    });

    return (
      <li className={crossingClassName}>
        <button className="delete" onClick={this.deleteThisCrossing.bind(this)}>
          &times;
        </button>
 
        <span className="text">{this.props.crossing.geoJSON.name} - [{this.props.crossing.geoJSON.lat},{this.props.crossing.geoJSON.lng}]</span>

        <span className="text">Status:</span>
        <input
          className="text"
          type="text"
          value={this.props.crossing.status}
          onChange={this.setStatus.bind(this)}
        />
      </li>
    );
  }
}
 
Crossing.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  crossing: PropTypes.object.isRequired,
};