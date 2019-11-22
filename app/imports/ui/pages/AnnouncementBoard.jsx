import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Card } from 'semantic-ui-react';
import { Announcements } from '/imports/api/announcement/Announcements';
import AnnouncementPost from '../pages/Landing';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class AnnouncementBoard extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
      <Container>
        <Header as="h2" textAlign="center" inverted>List Announcements</Header>
        <Card.Group centered>
          {this.props.announcements.reverse().map((announcement, index) => <AnnouncementPost key={index}
          announcement={announcement}/>)}
        </Card.Group>
      </Container>
  );
  }
}

/** Require an array of Stuff documents in the props. */
AnnouncementBoard.propTypes = {
  announcements: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Announcement documents.
  const subscription = Meteor.subscribe('Announcements');
  return {
    announcements: Announcements.find({}).fetch(),
    ready: subscription.ready(),
  };
})(AnnouncementBoard);
