import React from 'react';
import { Card, Image, Button } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class ClubCard extends React.Component {
  render() {
    return (
        <div className="card-shadow">
          {/* eslint-disable-next-line no-template-curly-in-string */}
        <Card as={Link} to={`/clubpage/${this.props.club._id}`}>
          <Image src="https://www.staradvertiser.com/wp-content/uploads/2018/08/web1_20171228_brk_uhm01.jpg" wrapped ui={false}></Image>
          <Card.Content>
            <Card.Header>{this.props.club.name}</Card.Header>
            <Card.Meta>{this.props.club.subname}</Card.Meta>

            <Card.Description>
              {this.props.club.description}
              {this.props.club.tags}
            </Card.Description>
          </Card.Content>
          {/* <Card.Content extra> */}
          {/*  <Link to={`/editclub/${this.props.club._id}`}>Edit</Link> */}
          {/* </Card.Content> */}
        </Card>
        </div>
    );
  }
}

/** Require a document to be passed to this component. */
ClubCard.propTypes = {
  club: PropTypes.object.isRequired,
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(ClubCard);
