import React from 'react';
import { Card, Image } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ClubCard extends React.Component {
  render() {
    return (
        <Card>
          <Card.Content>
            <Image floated='right' size='mini' src='images/AlgorithmsLogojpg.jpg'/>
            <Card.Header>{this.props.club.name}</Card.Header>
            <Card.Meta>{this.props.club.subname}</Card.Meta>
            <Card.Description>
              {this.props.club.description}
            </Card.Description>
          </Card.Content>
          {/* <Card.Content extra> */}
          {/*  <Link to={`/editclub/${this.props.club._id}`}>Edit</Link> */}
          {/* </Card.Content> */}
        </Card>
    );
  }
}

/** Require a document to be passed to this component. */
ClubCard.propTypes = {
  club: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ClubCard);
