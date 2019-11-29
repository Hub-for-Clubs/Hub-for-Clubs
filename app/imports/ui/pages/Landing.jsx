import React from 'react';
import { Meteor } from 'meteor/meteor';

import FrontPage from './FrontPage';
import Profile from './Profile';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    return Meteor.user() ? <Profile/> : <FrontPage/>;
  }
}

export default Landing;
