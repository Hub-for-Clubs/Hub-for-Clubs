import React from 'react';
import { Card } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class AnnouncementPost extends React.Component {
  render() {
    return (
        <div class="card-style">
      <Card fluid color='green'>
          <Card.Content>
            <Card.Header>{this.props.announcement.club}: {this.props.announcement.title}</Card.Header>
            <Card.Meta>{this.props.announcement.owner}</Card.Meta>
            <Card.Description>
              {this.props.announcement.description}
            </Card.Description>
          </Card.Content>
        <Card.Content>
        { (Meteor.user() !== null) ? ((Meteor.user().profile.leader === this.props.announcement.club) ? (
            <Link exact to={`/editannouncement/${this.props.announcement._id}`}>
              Edit Announcement</Link>
        ) : '') : '' }
        </Card.Content>
      </Card>
        </div>
    );
  }
}

/** Require a document to be passed to this component. */
AnnouncementPost.propTypes = {
    announcement: PropTypes.object.isRequired
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(AnnouncementPost);
