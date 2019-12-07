import React from 'react';
import { Card, Image, } from 'semantic-ui-react';
import PropTypes from 'prop-types';
import { withRouter, Link } from 'react-router-dom';

/** Renders a single row in the List Stuff table. See pages/ListStuff.jsx. */
class UserCard extends React.Component {
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
};

/** Wrap this component in withRouter since we use the <Link> React Router element. */
export default withRouter(UserCard);
