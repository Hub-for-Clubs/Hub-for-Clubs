import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Loader, Form, Menu, Segment, Card, Grid, Button } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import ClubCard from '../components/ClubCard';
import { Clubs } from '../../api/club/Club';
import { Interests } from '../../api/interest/Interest';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ClubExplorer extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */

  state = { selectedTags: [], pageNumber: 0, search: '', ignoreTags: true, display: [] };

  render() {
    return this.props.ready ? this.renderPage() : <Loader active>Getting data</Loader>;
  }

  selectTag(name) {
    if (this.state.selectedTags.includes(name)) {
      this.setState({ selectedTags: this.state.selectedTags.filter((value) => value !== name) });
    } else {
      this.setState({ selectedTags: this.state.selectedTags.concat([name]) });
    }
    this.setState({ pageNumber: 0 });
  }

  doesClubMatchInterest(club) {
    let count = 0;
    for (let i = 0; i < this.state.selectedTags.length; i++) {
      if (club.tags.includes(this.state.selectedTags[i].toLowerCase())) {
        count += 1;
      }
    }
    return count === this.state.selectedTags.length;
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  };

  searchForClub = () => {
    const searchQuery = this.state.search.toLowerCase().split(' ');
    const clubs = [];
    const results = {};
    this.setState({ display: [] });

    Clubs.find({}).fetch().map((club) => clubs.push(club.name));

    for (let i = 0; i < clubs.length; i++) {
      const temp = clubs[i].split(' ').map((word) => word.replace(/[.,\/#!$%\^&\*;:{}=\-_`~()@?']/g, ''));
      for (let j = 0; j < temp.length; j++) {
        if (results[temp[j].toLowerCase()] && !results[temp[j].toLowerCase()].includes(clubs[i])) {
          results[temp[j].toLowerCase()].push(clubs[i]);
        } else {
          results[temp[j].toLowerCase()] = [clubs[i]];
        }
      }
    }
    console.log(results);
    delete results[''];

    for (let i = 0; i < searchQuery.length; i++) {
      if (results[searchQuery[i]]) {
        this.setState({ display: this.state.display.concat(results[searchQuery[i]]) });
      }
    }
  };

  /** Render the page once subscriptions have been received. */
  renderPage() {

    let display = this.state.display;
    const interestMatchLength = display.length;
    display = display.filter((club, index) => index >= this.state.pageNumber * 12 && index < (this.state.pageNumber + 1) * 12);
    return (
        <div className="club-explorer-background">
          <Form onSubmit={this.searchForClub}>
            <Form.Input onChange={this.handleChange} name='search' content={this.state.search}/>
          </Form>
            <Grid>
            <Grid.Column width={4}>
              <Menu fluid vertical tabular>
                <Segment inverted>

                {Interests.find({}).fetch().map((interest, index) => <Menu.Item key={index} name={index}
                                           color={this.state.selectedTags.includes(interest.name) ? 'red' : null}
                                             content={interest.name} style={{ color: 'white' }}
                                             onClick={() => this.selectTag(interest.name)}/>)}
                </Segment>
              </Menu>
            </Grid.Column>
            <Grid.Column width={8} relaxed>
              {
                // eslint-disable-next-line max-len
                    <Card.Group stretched relaxed fluid itemsPerRow={3}>

                      {/* eslint-disable-next-line no-nested-ternary,max-len */}
                        {display.map((club, index) => <ClubCard key={index} club={club} style={{ padding: '20px 20px 20px 20px' }}/>)}

                    </Card.Group>
              }
          {this.state.pageNumber > 0 ? <Button onClick={() => this.setState({ pageNumber: this.state.pageNumber - 1 })}>Back</Button> : null}
          {(this.state.pageNumber + 1) * 12 < interestMatchLength ? <Button onClick={() => this.setState({ pageNumber: this.state.pageNumber + 1 })}>Next</Button> : null}
            </Grid.Column>
            </Grid>
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
