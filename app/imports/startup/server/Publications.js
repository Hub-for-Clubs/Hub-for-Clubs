import { Meteor } from 'meteor/meteor';
import { Roles } from 'meteor/alanning:roles';
import { Stuffs } from '../../api/stuff/Stuff';
import { Announcements } from '../../api/announcement/Announcements';
import { Interests } from '../../api/interest/Interest';
import { Clubs } from '../../api/club/Club';
import { Majors } from '../../api/major/Major';

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Stuff', function publish() {
  if (this.userId) {
    const username = Meteor.users.findOne(this.userId).username;
    return Stuffs.find({ owner: username });
  }
  return this.ready();
});

/** This subscription publishes all documents regardless of user, but only if the logged in user is the Admin. */
Meteor.publish('StuffAdmin', function publish() {
  if (this.userId && Roles.userIsInRole(this.userId, 'admin')) {
    return Stuffs.find();
  }
  return this.ready();
});

/** This subscription publishes only the documents associated with the logged in user */
Meteor.publish('Announcements', function publish() {
  return Announcements.find();
});

Meteor.publish('Interests', function publish() {
  return Interests.find();
});

Meteor.publish('Majors', function publish() {
  return Majors.find();
})

Meteor.publish('Clubs', function publish() {
  return Clubs.find();
})
