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
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (
        <div className="club-explorer-background">
          <div className="club-explorer-text">
          <Header as='h1' textAlign='center' inverted>CLUB EXPLORER</Header>
          </div>
              {
                // eslint-disable-next-line max-len
                    <Card.Group centered>
                      <Grid container stretched centered relaxed='very' columns='equal'>

                      {/* eslint-disable-next-line no-nested-ternary */}
                        {Clubs.find({}).fetch().map((club, index) => <ClubCard key={index} club={club}/>)
                      }
                      </Grid>
                    </Card.Group>
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
