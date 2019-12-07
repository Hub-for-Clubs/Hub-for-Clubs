import React, { useState } from 'react';
import { Meteor, _ } from 'meteor/meteor';
import { Image, Loader, Grid, Header, List, Menu, Card, Form } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import ClubCard from '../components/ClubCard';
import { Announcements } from '../../api/announcement/Announcements';
import { Interests } from '../../api/interest/Interest';
import { Majors } from '../../api/major/Major';
import { Clubs } from '../../api/club/Club';
import AnnouncementPost from '../components/AnnouncementPost';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class Profile extends React.Component {

  state = { activeItem: 'clubs-joined', interest: '', major: '', recommendations: [], temp: '' };

  handleMenuClick = (e, { name }) => { this.setState({ activeItem: name }); };

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  handleInterestSubmit = () => {
    // eslint-disable-next-line max-len
    if (Interests.findOne({ name: this.state.interest }) && !(this.props.user.profile.interests.includes(this.state.interest))) {
      Meteor.users.update({ _id: Meteor.userId() },
          { $set: { 'profile.interests': this.props.user.profile.interests.concat([this.state.interest]) } });
      this.setState({ interest: '' });
    }
  }

  removeInterest = function (interest) {
    return function () {
      Meteor.users.update({ _id: Meteor.userId() },
          // eslint-disable-next-line max-len
          { $set: { 'profile.interests': this.props.user.profile.interests.filter(function (value) { return value !== interest; }) } });
      window.location.reload(false);
    };
  }

  removeMajor = function (major) {
    return function () {
      Meteor.users.update({ _id: Meteor.userId() },
          { $set: { 'profile.majors': this.props.user.profile.majors.filter(function (value) { return value !== major; }) } });
      window.location.reload(false);
    };
  }

  handleMajorSubmit = () => {
    if (Majors.findOne({ name: this.state.major }) && !this.props.user.profile.majors.includes(this.state.major)) {
      Meteor.users.update({ _id: Meteor.userId() },
          { $set: { 'profile.majors': this.props.user.profile.majors.concat([this.state.major]) } });
      this.setState({ major: '' });
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
    for (let i = 0; i < this.props.user.profile.interests.length; i++) {
      const clubs = Interests.findOne({ name: this.props.user.profile.interests[i] }).associated_clubs;
      for (let j = 0; j < clubs.length; j++) {
        if (!recommendations.includes(clubs[j]) && !this.props.user.profile.clubs.favorite.includes(clubs[j])
            && !this.props.user.profile.clubs.joined.includes(clubs[j])) {
          recommendations.push(clubs[j]);
        }
      }
    }

    const announcements = [];
    console.log(this.props.user);
    const subscribed = this.props.user.profile.clubs.favorite.concat(this.props.user.profile.clubs.joined);
    // eslint-disable-next-line max-len
    subscribed.map((clubName) => Announcements.find({ club: clubName }).map((announcement) => (!announcements.find((a) => a._id === announcement._id) ? announcements.push(announcement) : null)));

    return (
        <div className="profile">
          <Grid>
            <Grid.Column width={4} className="user_info">
              <Image className="profile_picture" src={ this.props.user.profile.image } size="medium"/>
              <Header className="name">{this.props.user.username}</Header>
              <Header className="heading">Interest</Header>
              <hr style={{ marginLeft: '1em' }}/>
              <List bulleted className="list">
                {/* eslint-disable-next-line max-len */}
                {this.props.user.profile.interests.map((interest, index) => <List.Item key={index} onClick={this.removeInterest(interest)}>{interest}</List.Item>)}</List>
              <Form onSubmit={this.handleInterestSubmit}>
                <Grid columns={2}>
                  <Grid.Column>
                    <Form.Input style={{ marginLeft: '3em' }}
                           list='interests'
                           name="interest"
                           value={this.state.interest}
                            onChange={this.handleChange}/>
                    <datalist id='interests'>
                      {this.props.interests.map((interest, index) => <option key={index} value={interest.name}/>)}
                    </datalist>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Button style={{ marginLeft: '2em' }}
                            type='submit'>Submit</Form.Button>
                  </Grid.Column>
                </Grid>
              </Form>
              <Header className="heading">Majors</Header>
              <hr style={{ marginLeft: '1em' }}/>
              <List bulleted className="list">
                {/* eslint-disable-next-line max-len */}
                {this.props.user.profile.majors.map((major, index) => <List.Item key={index} onClick={this.removeMajor(major)}>{major}</List.Item>)}
              </List>
              <Form onSubmit={this.handleMajorSubmit}>
                <Grid columns={2}>
                  <Grid.Column>
                    <div>
                      <Form.Input style={{ marginLeft: '3em' }}
                             list='majors'
                             name="major"
                             value={this.state.major}
                             onChange={this.handleChange}/>
                      <datalist id='majors'>
                        {this.props.majors.map((major, index) => <option key={index} value={major.name}/>)}
                      </datalist>
                    </div>
                  </Grid.Column>
                  <Grid.Column>
                    <Form.Button style={{ marginLeft: '2em' }}
                            type='submit'>Submit</Form.Button>
                  </Grid.Column>
                </Grid>
              </Form>
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
              {
                // eslint-disable-next-line max-len
                (activeItem === 'clubs-joined' && this.props.user.profile.clubs.joined.length > 0) || (activeItem === 'favorite-clubs' && this.props.user.profile.clubs.favorite.length > 0) || (activeItem === 'recommended-clubs' && recommendations.length > 0) || (activeItem === 'announcements') ?
                <Card.Group>
                  {
                    // eslint-disable-next-line no-nested-ternary
                    activeItem === 'clubs-joined' ?
                     // eslint-disable-next-line max-len
                      this.props.user.profile.clubs.joined.map((club, index) => <ClubCard key={index} club={Clubs.findOne({ name: club })}/>) :
                    // eslint-disable-next-line no-nested-ternary
                    activeItem === 'favorite-clubs' ?
                      this.props.user.profile.clubs.favorite.map((club, index) => <ClubCard
                                                              key={index} club={Clubs.findOne({ name: club })}/>) :
                    // eslint-disable-next-line no-nested-ternary
                    activeItem === 'recommended-clubs' ?
                      recommendations.map((recommendation, index) => <ClubCard key={index}
                                         club={Clubs.findOne({ name: recommendation })}/>) :

                    activeItem === 'announcements' ?
                    // eslint-disable-next-line no-nested-ternary,max-len
                        announcements.map((announcement, index) => <AnnouncementPost
                            key={index} announcement={announcement}/>) :
                    null
                  }
                </Card.Group> : null
              }
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
Profile.propTypes = {
  interests: PropTypes.array.isRequired,
  majors: PropTypes.array.isRequired,
  clubs: PropTypes.array.isRequired,
  announcements: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired,
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(({ match }) => {
  // Get access to Stuff documents.
  const interests_sub = Meteor.subscribe('Interests');
  const majors_sub = Meteor.subscribe('Majors');
  const clubs_sub = Meteor.subscribe('Clubs');
  const announcements_sub = Meteor.subscribe('Announcements');
  const documentId = match.params._id;
  const users_sub = Meteor.subscribe('userData');

  return {
    interests: Interests.find({}).fetch(),
    majors: Majors.find({}).fetch(),
    clubs: Clubs.find({}).fetch(),
    announcements: Announcements.find({}).fetch(),
    user: Meteor.users.findOne({ _id: documentId }),
    ready: interests_sub.ready() && majors_sub.ready() && clubs_sub.ready() &&
        announcements_sub.ready() && users_sub.ready(),
  };
})(Profile);
