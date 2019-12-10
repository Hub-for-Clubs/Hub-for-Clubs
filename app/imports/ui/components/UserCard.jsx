import React from 'react';
import { Button, Card, Image, } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class UserCard extends React.Component {
  toggleJoin(name) {

    if (this.props.user.profile.leader !== name) {
      Meteor.users.update({ _id: this.props.user._id },
          // eslint-disable-next-line eqeqeq
          { $set: { 'profile.leader': name } });
    } else {
      Meteor.users.update({ _id: Meteor.userId() },
          { $set: { 'profile.leader': '' } });
      }
    }

  render() {
    return (
        <div className="card-shadow">
          {/* eslint-disable-next-line no-template-curly-in-string */}
          <Card as={Link} to={`/profile/${this.props.user._id}`}>
            <Image src={this.props.user.profile.image} wrapped ui={false}></Image>
            <Card.Content>
              <Card.Header>{this.props.user.username}</Card.Header>
              {(this.props.user.profile.majors[0]) ? <Card.Meta>{this.props.user.profile.majors[0]}</Card.Meta> : ''}
              {(this.props.user.profile.majors[1]) ? <Card.Meta>{this.props.user.profile.majors[1]}</Card.Meta> : ''}
              {(this.props.user.profile.majors[2]) ? <Card.Meta>{this.props.user.profile.majors[2]}</Card.Meta> : ''}
            </Card.Content>

            { this.props.club !== undefined ? (Meteor.user().profile.leader === this.props.club.name ? (<Card.Content>
              <Button content={'Kick from Club'} onClick={() => Meteor.users.update({ _id: Meteor.userId() },
                  { $set: { 'profile.clubs.joined': this.props.user.profile.clubs.joined.concat([this.props.club.name]) } })}/>
            </Card.Content>) : '') : ''}
            { this.props.club !== undefined ? (Meteor.user().profile.leader === this.props.club.name ? (<Card.Content>
              <Button content={ this.props.user.profile.leader !== this.props.club.name ? 'Make an Officer' : 'Demote Officer'} onClick={() => this.toggleJoin(this.props.club.name)}/>
            </Card.Content>) : '') : ''}
            {/* <Card.Content extra> */}
            {/*  <Link to={`/editclub/${this.props.club._id}`}>Edit</Link> */}
            {/* </Card.Content> */}
          </Card>
        </div>
    );
  }
}

/** Require a document to be passed to this component. */
UserCard.propTypes = {
  user: PropTypes.object.isRequired,
  club: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(UserCard);
