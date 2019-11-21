import React from 'react';
import { Card } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class AnnouncementPost extends React.Component {
  render() {
    return (
      <Card>
          <Card.Content>
            <Card.Header>{this.props.announcement.owner}</Card.Header>
            <Card.Meta>{this.props.announcement.Title}</Card.Meta>
            <Card.Description>
              {this.props.announcement.Description}
            </Card.Description>
          </Card.Content>
      </Card>
    );
  }
}

/** Require a document to be passed to this component. */
AnnouncementPost.propTypes = {
    announcement: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(AnnouncementPost);
