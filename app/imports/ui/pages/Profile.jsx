import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Container, Header, Loader, Grid } from 'semantic-ui-react';
import { Stuffs } from '/imports/api/stuff/Stuff';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Profile extends React.Component {

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <Container>
          <Header as="h2" textAlign="center">Profile</Header>
          <Grid class="ui two column grid">
          <div className="four wide column">
              <div className="row">
                <h1>Name</h1>
              </div>
            <div className="row">
                <img src='/images/HubForClubsLogo.png' width='100px' height='100px'></img>
            </div>
              <div className="row">
                Interests
              </div>
              <div className="row">
                Bio
              </div>
              <div className="row">
                Clubs
              </div>
          </div>
          <div className="twelve wide column">
            <div className="row">
                <h1>Clubs Joined</h1>
            </div>
            <div className="row">
              <h2>Clubs Joined</h2>
            </div>
            <div className="row">
                <h1>Clubs Admin</h1>
            </div>
            <div className="row">
              <h2>Clubs Admin</h2>
            </div>
            <div className="row">
                <h1>Announcements</h1>
            </div>
            <div className="row">
              <h2>Announcements</h2>
            </div>
          </div>
          </Grid>
        </Container>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Profile.propTypes = {
  stuffs: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const subscription = Meteor.subscribe('Stuffs');
  return {
    stuffs: Stuffs.find({}).fetch(),
    ready: subscription.ready(),
  };
})(Profile);
