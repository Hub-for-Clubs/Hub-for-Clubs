import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Image, Loader, Grid, Header, List, Menu, Card, Container, Button, Segment } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import { Link, NavLink, Redirect } from 'react-router-dom';
import swal from 'sweetalert';
import { Interests } from '../../api/interest/Interest';
import { Majors } from '../../api/major/Major';
import { Clubs } from '../../api/club/Club';
import { Announcements } from '../../api/announcement/Announcements';
import AnnouncementPost from '../components/AnnouncementPost';
import UserCard from '../components/UserCard';
import TextField from 'uniforms-semantic/TextField';
import LongTextField from 'uniforms-semantic/LongTextField';
import SubmitField from 'uniforms-semantic/SubmitField';
import ErrorsField from 'uniforms-semantic/ErrorsField';
import AutoForm from 'uniforms-semantic/AutoForm';
import SimpleSchema from 'simpl-schema';

const formSchema = new SimpleSchema({
  title: String,
  description: String,
});

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ClubPage extends React.Component {

  state = { activeItem: 'About-Us' };

  handleMenuClick = (e, { name }) => { this.setState({ activeItem: name })};

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }



  /** On submit, insert the data. */
  submit(data, formRef) {
    const { title, description } = data;
    const owner = Meteor.user().username;
    const club = Meteor.user().profile.leader;
    console.log(club);
    Announcements.insert({ title, description, owner, club },
        (error) => {
          if (error) {
            swal('Error', error.message, 'error');
          } else {
            swal('Success', 'Post added successfully', 'success');
            formRef.reset();

          }
        });
  }

  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */
  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  toggleJoin(name) {
    let index = Meteor.user().profile.clubs.joined.indexOf(name);
    if (index !== -1) {
      Meteor.users.update({ _id: Meteor.userId() },
          // eslint-disable-next-line eqeqeq
          { $set: { 'profile.clubs.joined': Meteor.user().profile.clubs.joined.filter((club) => club !== name) } });
    } else {
      Meteor.users.update({ _id: Meteor.userId() },
          { $set: { 'profile.clubs.joined': Meteor.user().profile.clubs.joined.concat([name]) } });
      index = Meteor.user().profile.clubs.favorite.indexOf(name);
      if (index !== -1) {
        Meteor.users.update({ _id: Meteor.userId() },
          { $set: { 'profile.clubs.favorite': Meteor.user().profile.clubs.favorite.filter((club) => club !== name) } });
      }
    }
  }

  toggleFavorite(name) {
    let index = Meteor.user().profile.clubs.favorite.indexOf(name);
    if (index !== -1) {
      Meteor.users.update({ _id: Meteor.userId() },
          // eslint-disable-next-line eqeqeq
          { $set: { 'profile.clubs.favorite': Meteor.user().profile.clubs.favorite.filter((club) => club !== name) } });
    } else {
      Meteor.users.update({ _id: Meteor.userId() },
          { $set: { 'profile.clubs.favorite': Meteor.user().profile.clubs.favorite.concat([name]) } });
      index = Meteor.user().profile.clubs.joined.indexOf(name);
      if (index !== -1) {
        Meteor.users.update({ _id: Meteor.userId() },
            { $set: { 'profile.clubs.joined': Meteor.user().profile.clubs.joined.filter((club) => club !== name) } });
      }
    }
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const { activeItem } = this.state;
    let fRef = null;
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
                <Header className="name">{this.props.clubs.name}</Header>

                {Meteor.user() ? <Button content={Meteor.user().profile.clubs.joined.includes(this.props.clubs.name) ?
                    'Leave Club' : 'Join'} onClick={() => this.toggleJoin(this.props.clubs.name)}/> :
                <Button as={NavLink} exact to={''} content={'Join'}/>}

                {Meteor.user() ? <Button content={Meteor.user().profile.clubs.favorite.includes(this.props.clubs.name) ?
                    'Unfavorite' : 'Favorite'} onClick={() => this.toggleFavorite(this.props.clubs.name)}/> :
                <Button as={NavLink} exact to={''} content={'Favorite'}/>}

                <Header className="heading">Leader</Header>
                <h3>{this.props.clubs.leader}</h3>
                <h4>{this.props.clubs.email}</h4>
                <hr style={{ marginLeft: '1em' }}/>
                <Header className="heading">Our Website</Header>
                <h3><a target="_blank" href={`//${this.props.clubs.website.toString()}`}>
                  {this.props.clubs.website}</a></h3>
                <hr style={{ marginLeft: '1em' }}/>
                <Header className={'heading'}>Interests</Header>
                <List bulleted className="list">
                  {this.props.clubs.tags.map((m, index) => <List.Item key={index}>{m}</List.Item>)}
                </List>
              </Grid.Column>

              <Grid.Column width={12} className="club_info">
                {Meteor.user() && Meteor.user().profile.leader === this.props.clubs.name ? <Button as={NavLink} exact to={`/editclub/${this.props.clubs._id}`} content={'Manage Club Info'}/> : ''}
                <Menu pointing secondary>
                  <Menu.Item name="About-Us" active={activeItem === 'About-Us'} onClick={this.handleMenuClick}/>
                  <Menu.Item name={'Members'} active={activeItem === 'Members'}
                                                                onClick={this.handleMenuClick}/>



                </Menu>
                <Container>
                  <Card.Group>
                    {/* eslint-disable-next-line no-nested-ternary */}
                    {activeItem === 'About-Us' ?
                        <Container>
                          {(this.props.clubs.description !== 'N/A') ? <h3>{this.props.clubs.description}</h3> : <h3> </h3>}
                          <h2>Our Announcements</h2>

                          { (Meteor.user() !== null) ? ((Meteor.user().profile.leader === this.props.clubs.name) ? (
                              <AutoForm ref={ref => { fRef = ref; }} schema={formSchema} onSubmit={data => this.submit(data, fRef)} >
                                <h2>Make an Announcement!</h2>
                                <Segment>
                                  <TextField name='title'/>
                                  <LongTextField name='description'/>
                                  <SubmitField value='Submit'/>
                                  <ErrorsField/>
                                </Segment>
                              </AutoForm>
                          ) : '') : '' }

                          {this.props.announcements.reverse().map((announcement, index) => <AnnouncementPost key={index}
                                                                                                              announcement={announcement}/>)}
                        </Container>
                        :
                        activeItem === 'Members' ?
                            this.props.users.filter((user) => ((user.profile.clubs.joined.includes(this.props.clubs.name))))
                                .map((user, index) => <UserCard key={index} club={this.props.clubs} user={user}/>)
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
  const clubname = Announcements.findOne({ _id: documentId });
  return {

    interests: Interests.find({}).fetch(),
    majors: Majors.find({}).fetch(),
    clubs: Clubs.findOne({ _id: documentId }),
    announcements: Announcements.find({ name: clubname }).fetch(),
    users: Meteor.users.find({}).fetch(),
    ready: interests_sub.ready() && majors_sub.ready() && clubs_sub.ready() && announcements_sub.ready() && users_sub.ready(),
  };
})(ClubPage);
