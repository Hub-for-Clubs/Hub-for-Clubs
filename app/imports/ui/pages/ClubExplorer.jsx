import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Loader, Header, Card, Grid, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import ClubCard from '../components/ClubCard';
import { Clubs } from '../../api/club/Club';
import { Interests } from '../../api/interest/Interest';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ClubExplorer extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */

  state = { tags: [] };

  createTags() {
    const temp = Interests.find({}).fetch();
    console.log(temp);
    // eslint-disable-next-line guard-for-in,no-restricted-syntax
    for (const i of temp) {
      console.log(i);
      temp.push((i, false));
    }
    return temp;
  }

  render() {
    return (this.props.ready) ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    this.setState({ tags: this.createTags() });
    return (
        <div className="club-explorer-background">
          <div className="club-explorer-text">
            <Header as='h1' textAlign='center' inverted>CLUB EXPLORER</Header>
          </div>
          <div style={{ marginLeft: '20%', marginRight: '20%', marginBottom: '5%', backgroundColor: 'white' }}>
            {Interests.find({}).fetch().map((interest, index) => <Button key={index}
                                             content={interest.name} style={{ margin: '1%' }}/>)}
          </div>
              {
                // eslint-disable-next-line max-len
                    <Card.Group centered>
                      <Grid container stretched centered relaxed='very' columns='equal'>

                      {/* eslint-disable-next-line no-nested-ternary */}
                        {Clubs.find({}).fetch().map((club, index) => <ClubCard key={index} club={club}/>)
                      }
                      </Grid>
                    </Card.Group>
              }
            <div style={{ paddingBottom: '10%' }}/>
        </div>
    );
  }
}

/** Require an array of Stuff documents in the props. */
ClubExplorer.propTypes = {
  ready: PropTypes.bool.isRequired,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
export default withTracker(() => {
  // Get access to Stuff documents.
  const clubs_sub = Meteor.subscribe('Clubs');
  const interests_sub = Meteor.subscribe('Interests');

  return {
    interests: Interests.find({}).fetch(),
    clubs: Clubs.find({}).fetch(),
    ready: clubs_sub.ready() && interests_sub.ready(),
  };
})(ClubExplorer);
