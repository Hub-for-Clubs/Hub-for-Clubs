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
        <Card as={Link} to={`/clubpage/${this.props.club._id}`} style={{ height: '100%' }}>
          <Image src="https://www.staradvertiser.com/wp-content/uploads/2018/08/web1_20171228_brk_uhm01.jpg"
                 wrapped ui={false}/>
          <Card.Content>
            <Card.Header>{this.props.club.name}</Card.Header>
            {this.props.club.name.length < 30 ? <br/> : null}
            <Card.Meta>{this.props.club.subname}</Card.Meta>

            <Card.Description>
              {/* eslint-disable-next-line no-nested-ternary */}
              {this.props.club.description > 100 ? this.props.club.description.slice(0, 100).concat('...') :
                  this.props.club.description.slice(0, 100)}
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
