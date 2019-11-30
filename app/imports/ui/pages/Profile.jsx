import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Image, Loader, Grid, Header, List, Menu, Card } from 'semantic-ui-react';
import { Stuffs } from '/imports/api/stuff/Stuff';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import ClubCard from '../components/ClubCard';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Profile extends React.Component {

  state = { activeItem: 'clubs-joined' };

  handleMenuClick = (e, { name }) => this.setState({ activeItem: name });

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const { activeItem } = this.state;
    console.log(`User: ${Meteor.user()}`)
    return (
        <div className="profile">
          <Grid>
            <Grid.Column width={4} className="user_info">
              <Image className="profile_picture" src={Meteor.user().profile.image} size="medium"/>
              <Header className="name">{Meteor.user().username}</Header>
              <Header className="heading">Interest</Header>
              <hr style={{ marginLeft: '1em' }}/>
              <List bulleted className="list">
                {Meteor.user().profile.interests.map((interest, index) => <List.Item
                    key={index}>{interest}</List.Item>)}
              </List>
              <Header className="heading">Major</Header>
              <hr style={{ marginLeft: '1em' }}/>
              <List bulleted className="list">
                {Meteor.user().profile.major.map((m, index) => <List.Item key={index}>{m}</List.Item>)}
              </List>
            </Grid.Column>
            <Grid.Column width={12} className="club_info">
              <Menu pointing secondary>
                <Menu.Item name="clubs-joined" active={ activeItem === 'clubs-joined' } onClick={this.handleMenuClick}/>
                <Menu.Item name="favorite-clubs" active={ activeItem === 'favorite-clubs' }
                           onClick={this.handleMenuClick}/>
                <Menu.Item name="recommended-clubs" active={ activeItem === 'recommended-clubs' }
                           onClick={this.handleMenuClick}/>
                <Menu.Item name="announcements" active={ activeItem === 'announcements' }
                           onClick={this.handleMenuClick}/>
              </Menu>
              <Card.Group>
                {/* eslint-disable-next-line no-nested-ternary */}
                {activeItem === 'clubs-joined' ?
                    Meteor.user().profile.clubs.joined.map((club, index) => <ClubCard key={index} club={club}/>) :
                    // eslint-disable-next-line no-nested-ternary
                  activeItem === 'favorite-clubs' ?
                      Meteor.user().profile.clubs.favorite.map((club, index) => <ClubCard key={index} club={club}/>) :
                      // eslint-disable-next-line no-nested-ternary
                  activeItem === 'recommended-clubs' ?
                  <ClubCard club={{
                    name: "Algorithm's Club", subname: 'Recommended', description: 'A club for people who ' +
                        'demonstrate many' +
                        'qualities such as loyalty, consistency, and commitment.  When people in this club claim they' +
                        'will attend a meeting, it is expected that they attend the meeting.',
                    image: 'images/AlgorithmsLogojpg.jpg',
                  }}/> :
                  activeItem === 'announcements' ?
                  <ClubCard club={{
                    name: "Algorithm's Club", subname: 'Announcements', description: 'A club for people who ' +
                        'demonstrate many' +
                        'qualities such as loyalty, consistency, and commitment.  When people in this club claim they' +
                        'will attend a meeting, it is expected that they attend the meeting.',
                    image: 'images/AlgorithmsLogojpg.jpg',
                  }}/> :
                  <Header>Something went terribly terribly wrong</Header>
                }
              </Card.Group>
            </Grid.Column>
          </Grid>
        </div>
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
  const subscription = Meteor.subscribe('Stuff');
  return {
    stuffs: Stuffs.find({}).fetch(),
    ready: subscription.ready(),
  };
})(Profile);
