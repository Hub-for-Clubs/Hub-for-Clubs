import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class AnnouncementPost extends React.Component {
  render() {
    return (
      <Card fluid>
          <Card.Content>
            <Image floated='left' size='mini' src={this.props.club.image} circular/>
            <Card.Header>{this.props.announcement.title}</Card.Header>
            <Card.Meta>{this.props.club.name}</Card.Meta>
            <Card.Description>
              {this.props.announcement.description}
            </Card.Description>
          </Card.Content>
      </Card>
    );
  }
}

/** Require a document to be passed to this component. */
AnnouncementPost.propTypes = {
    announcement: PropTypes.object.isRequired,
    club: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(AnnouncementPost);
