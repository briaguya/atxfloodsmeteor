import { Meteor } from 'meteor/meteor';
import { Mongo } from 'meteor/mongo';
import { check } from 'meteor/check';
 
export const Crossings = new Mongo.Collection('crossings');
 
if (Meteor.isServer) {
  // This code only runs on the server
  Meteor.publish('crossings', function crossingsPublication() {
    return Crossings.find({
      $or: [
        { owner: this.userId },
      ],
    });
  });
}

Meteor.methods({
  'crossings.insert'(geoJSON, status) {
    // TODO validate the geoJSON against something
    check(setStatus, String);
 
    // Make sure the user is logged in before adding a crossing
    if (! Meteor.userId()) {
      throw new Meteor.Error('not-authorized');
    }
 
    Crossings.insert({
      geoJSON,
      status,
      createdAt: new Date(),
      owner: Meteor.userId(),
      username: Meteor.user().username,
    });
  },
  'crossings.remove'(crossingId) {
    check(crossingId, String);
 
    const crossing = Crossings.findOne(crossingId);
    if (crossing.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can delete it
      throw new Meteor.Error('not-authorized');
    }

    Crossings.remove(crossingId);
  },
  'crossings.setStatus'(crossingId, setStatus) {
    check(crossingId, String);
    check(setStatus, String);
 
    const crossing = Tasks.findOne(crossingId);
    if (crossing.owner !== Meteor.userId()) {
      // If the task is private, make sure only the owner can check it off
      throw new Meteor.Error('not-authorized');
    }
 
    Crossings.update(crossingId, { $set: { status: setStatus } });
  },
});