import { Meteor } from 'meteor/meteor';
import { Stuffs } from '../../api/stuff/Stuff.js';
import { Announcements } from '../../api/announcement/Announcements';
import { Interests } from '../../api/interest/Interest';
import { Clubs } from '../../api/club/Club';
import { Majors } from '../../api/major/Major';

/* eslint-disable no-console */

/** Initialize the database with a default data document. */
function addData(data) {
  console.log(`  Adding: ${data.name} (${data.owner})`);
  Stuffs.insert(data);
}

function addAnnouncements(data) {
  console.log(`  Adding: ${data.title} (${data.owner})`);
  Announcements.insert(data);
}

function addInterest(data) {
  console.log(`  Adding: ${data.name}`)
  Interests.insert(data);
}

function addClub(data) {
  console.log(`  Adding: ${data.name}`);
  Clubs.insert(data);
}

function addMajor(data) {
  console.log(`  Adding: ${data.name}`);
  Majors.insert(data);
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

if (Clubs.find().count() === 0) {
  console.log('Creating default clubs');
  const clubJSON = JSON.parse(Assets.getText('RIOS.json')).RIOS;
  if (clubJSON.length !== 0) {
    clubJSON.map(data => addClub(data));
  }
}

if (Interests.find().count() === 0) {
  console.log('Creating default interests.');
  const interestJSON = JSON.parse(Assets.getText('Interests.json')).Interest;
  if (interestJSON.length !== 0) {
    interestJSON.map(data => addInterest(data));
  }
}

if (Majors.find().count() === 0) {
  console.log('Creating default majors');
  if (Meteor.settings.defaultMajors) {
    Meteor.settings.defaultMajors.map(data => addMajor(data));
  }
}
