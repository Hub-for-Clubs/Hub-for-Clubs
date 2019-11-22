import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Announcements } from '../../api/announcement/Announcements';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.insert(data);
}

function addAnnouncements(data) {
  console.log(`  Adding: ${data.Title} (${data.owner})`);
  Announcements.insert(data);
}

/** Initialize the collection if empty. */
if (Stuffs.find().count() === 0) {
  if (Meteor.settings.defaultData) {
    console.log('Creating default data.');
    Meteor.settings.defaultData.map(data => addData(data));
  }
}

/** Initialize the collection if empty. */
if (Announcements.find().count() === 0) {
  if (Meteor.settings.defaultAnnouncements) {
    console.log('Creating default announcements.');
    Meteor.settings.defaultAnnouncements.map(data => addAnnouncements(data));
  }
}
