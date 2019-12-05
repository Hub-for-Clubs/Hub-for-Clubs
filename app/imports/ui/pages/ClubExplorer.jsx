import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Image, Loader, Grid, Header, List, Menu, Card, Form } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import ClubCard from '../components/ClubCard';
import { Announcements } from '../../api/announcement/Announcements';
import { Interests } from '../../api/interest/Interest';
import { Majors } from '../../api/major/Major';
import { Clubs } from '../../api/club/Club';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ClubExplorer extends React.Component {

  state = { activeItem: 'clubs-joined', interest: '', major: '', recommendations: [] };

  handleMenuClick = (e, { name }) => {this.setState({ activeItem: name })};

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  handleInterestSubmit = () => {
    // eslint-disable-next-line max-len
    if (Interests.findOne({ name: this.state.interest }) && !(Meteor.user().profile.interests.includes(this.state.interest))) {
      Meteor.users.update({ _id: Meteor.userId() },
          { $set: { 'profile.interests': Meteor.user().profile.interests.concat([this.state.interest]) } });
      this.setState({ interest: '' });
    }
  }

  handleMajorSubmit = () => {
    if (this.state.major in this.props.majors) {
      Meteor.users.update({ _id: Meteor.userId() },
          { $set: { 'profile.majors': Meteor.user().profile.majors.concat([this.state.major]) } });
      this.setState({ m: '' });
    }
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const { activeItem } = this.state;
    const recommendations = [];
    for (let i = 0; i < Meteor.user().profile.interests.length; i++) {
      const clubs = Interests.findOne({ name: Meteor.user().profile.interests[i] }).associated_clubs;
      for (let j = 0; j < clubs.length; j++) {
        if (!recommendations.includes(clubs[j])) {
          recommendations.push(clubs[j]);
        }
      }
    }

    console.log(recommendations);
    return (
        <div className="club-explorer-background">
          <div className="club-explorer-text">
          <Header as='h1' textAlign='center' inverted>CLUB EXPLORER</Header>
          </div>
              {
                // eslint-disable-next-line max-len
                (activeItem === 'clubs-joined' && Meteor.user().profile.clubs.joined.length > 0) || (activeItem === 'favorite-clubs' && Meteor.user().profile.clubs.favorite.length > 0) || (activeItem === 'recommended-clubs' && recommendations.length > 0) ?
                    <Card.Group>
                      {/* eslint-disable-next-line no-nested-ternary */}
                      {activeItem === 'clubs-joined' ?
                          Clubs.find({}).fetch().map((club, index) => <ClubCard key={index} club={club}/>) :
                                      <Header>Something went terribly terribly wrong</Header>
                      }
                    </Card.Group> : null
              }
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ClubExplorer.propTypes = {
  announcements: PropTypes.array.isRequired,
  interests: PropTypes.array.isRequired,
  majors: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const interests_sub = Meteor.subscribe('Interests');
  const majors_sub = Meteor.subscribe('Majors');
  const clubs_sub = Meteor.subscribe('Clubs');
  const announcements_sub = Meteor.subscribe('Announcements');
  return {
    interests: Interests.find({}).fetch(),
    majors: Majors.find({}).fetch(),
    clubs: Clubs.find({}).fetch(),
    announcements: Announcements.find({}).fetch(),
    ready: interests_sub.ready() && majors_sub.ready() && clubs_sub.ready() && announcements_sub.ready(),
  };
})(ClubExplorer);
