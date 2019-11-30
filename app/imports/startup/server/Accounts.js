import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Roles } from 'meteor/alanning:roles';

/* eslint-disable no-console */

function createUser(username, email, password, image, role, leader, clubs, interests, major) {
  console.log(`Creating user: ${interests}`);
  const userID = Accounts.createUser({
    username: username,
    email: email,
    password: password,
    profile: {
      image: image,
      leader: leader,
      clubs: clubs,
      interests: interests,
      major: major,
    },
  });

  if (role === 'admin') {
    Roles.addUsersToRoles(userID, 'admin');
  }
  if (leader !== '') {
    Roles.addUsersToRoles(userID, 'leader');
  }
}

/** When running app for first time, pass a settings file to set up a default user account. */
if (Meteor.users.find().count() === 0) {
  if (Meteor.settings.defaultAccounts) {
    console.log('Creating the default user(s)');
    Meteor.settings.defaultAccounts.map(({ username, email, password, image, role, leader, clubs, interests, major }) => createUser(
        username, email, password, image, role, leader, clubs, interests, major
    ));
  } else {
    console.log('Cannot initialize the database!  Please invoke meteor with a settings file.');
  }
}

