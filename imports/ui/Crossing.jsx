import React, { Component, PropTypes } from 'react';
import { Meteor } from 'meteor/meteor';
import classnames from 'classnames';
 
// Task component - represents a single todo item
export default class Crossing extends Component {
  setStatus(status) {
    // Set the checked property to the opposite of its current value
    Meteor.call('crossings.setStatus', this.props.crossing._id, status);
  }
 
  deleteThisCrossing() {
    Meteor.call('crossings.remove', this.props.crossing._id);
  }

  render() {
    const crossingClassName = classnames({
      status: this.props.task.status,
    });

    return (
      <li className={crossingClassName}>
        <button className="delete" onClick={this.deleteThisTask.bind(this)}>
          &times;
        </button>
 
        <input
          type="checkbox"
          readOnly
          checked={this.props.task.checked}
          onClick={this.toggleChecked.bind(this)}
        />

        { this.props.showPrivateButton ? (
          <button className="toggle-private" onClick={this.togglePrivate.bind(this)}>
            { this.props.task.private ? 'Private' : 'Public' }
          </button>
        ) : ''}
 
        <span className="text">
          <strong>{this.props.task.username}</strong>: {this.props.task.text}
        </span>
      </li>
    );
  }
}
 
Task.propTypes = {
  // This component gets the task to display through a React prop.
  // We can use propTypes to indicate it is required
  task: PropTypes.object.isRequired,
  showPrivateButton: React.PropTypes.bool.isRequired,
};