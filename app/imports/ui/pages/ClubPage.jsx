import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Image, Loader, Grid, Header, List, Menu, Card, Container, AutoForm, Form } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Interests } from '../../api/interest/Interest';
import { Majors } from '../../api/major/Major';
import { Clubs } from '../../api/club/Club';
import { Announcements } from '../../api/announcement/Announcements';
import AnnouncementPost from '../components/AnnouncementPost';
import UserCard from '../components/UserCard';
import swal from 'sweetalert';
import { Link } from 'react-router-dom';
import HiddenField from 'uniforms-semantic/HiddenField';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ClubPage extends React.Component {

  state = { activeItem: 'About-Us' };

  handleMenuClick = (e, { name }) => { this.setState({ activeItem: name })};

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  addData(data) {
    const { new_club } = data;
    Meteor.user().profile.clubs.joined.update({ $push: { new_club } }, (error) => (error ?
        swal('Error', error.message, 'error') :
        swal('Success', 'Item updated successfully', 'success')));
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const { activeItem } = this.state;
    if (this.props.clubs === undefined) {
      return (
          <h1>ERROR 404: Yo put in something that exists</h1>
      );
    }
      return (
          <div className="profile">
            <Grid>
              <Grid.Column width={4} className="user_info">
                <Image className="profile_picture"
                       src={(this.props.clubs.image !== 'N/A') ? this.props.clubs.image : 'https://pbs.twimg.com/profile_images/1052001602628857856/AGtSZNoO_400x400.jpg'}
                       alt={'Club Picture'}
                       size="medium"/>
                <Form.Button style={{ marginLeft: '2em' }} onClick={this.addData(this.props.clubs.name)}>Join</Form.Button>
                <Header className="name">{this.props.clubs.name}</Header>
                <Header className="heading">Leader</Header>
                <h3>{this.props.clubs.leader}</h3>
                <h4>{this.props.clubs.email}</h4>
                <hr style={{ marginLeft: '1em' }}/>
                <Header className="heading">Our Website</Header>
                <h3><Link exact to={this.props.clubs.website}>
                  {this.props.clubs.website}</Link></h3>
                <hr style={{ marginLeft: '1em' }}/>
                <Header className={"heading"}>Interests</Header>
                <List bulleted className="list">
                  {this.props.clubs.tags.map((m, index) => <List.Item key={index}>{m}</List.Item>)}
                </List>
              </Grid.Column>

              <Grid.Column width={12} className="club_info">
                <Menu pointing secondary>
                  <Menu.Item name="About-Us" active={activeItem === 'About-Us'} onClick={this.handleMenuClick}/>
                  <Menu.Item name="Members" active={activeItem === 'Members'}
                             onClick={this.handleMenuClick}/>

                </Menu>
                <Container>
                  <Card.Group>
                    {/* eslint-disable-next-line no-nested-ternary */}
                    {activeItem === 'About-Us' ?
                        <Container>
                          {(this.props.clubs.description !== 'N/A') ? <h3>{this.props.clubs.description}</h3> : <h3> </h3>}
                          <h2>Our Announcements</h2>
                          {Announcements.find({ club: this.props.clubs.name }).map((announcement, index) =>
                              <AnnouncementPost key={index} announcement={announcement}/>)}
                        </Container>
                        :
                        activeItem === 'Members' ?
                            this.props.users.filter((user) => ((user.profile.clubs.joined.includes(this.props.clubs.name))))
                                .map((user, index) => <UserCard key={index} user={user}/>)
                            :
                            <Header>Something went terribly terribly wrong</Header>
                    }
                  </Card.Group>
                </Container>
              </Grid.Column>

            </Grid>
          </div>
      );
    }
}

/** Require an array of Stuff documents in the props. */
ClubPage.propTypes = {
  clubs: PropTypes.object.isRequired,
  interests: PropTypes.array.isRequired,
  majors: PropTypes.array.isRequired,
  ready: PropTypes.bool.isRequired,
  users: PropTypes.array.isRequired,
  announcements: PropTypes.array.isRequired,
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
    clubs: Clubs.findOne({ _id: documentId }),
    announcements: Announcements.find({}).fetch(),
    users: Meteor.users.find({}).fetch(),
    ready: interests_sub.ready() && majors_sub.ready() && clubs_sub.ready() && announcements_sub.ready() && users_sub.ready(),
  };
})(ClubPage);
