import React from 'react';
import { Meteor } from 'meteor/meteor';

import Signup from './Signup';
import Profile from './Profile';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return Meteor.user() ? <Profile/> : <Signup/>;
  }
}

export default Landing;
