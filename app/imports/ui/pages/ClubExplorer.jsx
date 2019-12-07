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

  state = { selectedTags: [] };

  render() {
    return this.props.ready ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  selectTag(name) {
    if (this.state.selectedTags.includes(name)) {
      this.setState( { selectedTags: this.state.selectedTags.filter((value) => value !== name) });
    } else {
      this.setState({ selectedTags: this.state.selectedTags.concat([name]) });
    }
  }

  doesClubMatchInterest(club) {
    let count = 0;
    for (let i = 0; i < this.state.selectedTags.length; i++) {
      if (club.tags.includes(this.state.selectedTags[i].toLowerCase())) {
        count += 1;
      }
    }

    console.log(club);
    console.log(this.state.selectedTags);
    return count === this.state.selectedTags.length;
  }

  /** Render the page once subscriptions have been received. */
  renderPage() {
    return (
        <div className="club-explorer-background">
          <div className="club-explorer-text">
            <Header as='h1' textAlign='center' inverted>CLUB EXPLORER</Header>
          </div>
          <div style={{ marginLeft: '20%', marginRight: '20%', marginBottom: '5%', backgroundColor: 'white' }}>
            {Interests.find({}).fetch().map((interest, index) => <Button key={index}
                                             color={this.state.selectedTags.includes(interest.name) ? 'red' : null}
                                             content={interest.name} style={{ margin: '1%' }}
                                             onClick={() => this.selectTag(interest.name)}/>)}
          </div>
              {
                // eslint-disable-next-line max-len
                    <Card.Group centered>
                      <Grid container stretched centered relaxed='very' columns='equal'>

                      {/* eslint-disable-next-line no-nested-ternary */}
                        {Clubs.find({}).fetch().map((club, index) => this.doesClubMatchInterest(club) ? <ClubCard key={index} club={club}/> : null)}
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
