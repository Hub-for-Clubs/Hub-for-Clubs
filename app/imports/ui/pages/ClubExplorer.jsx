import React from 'react';
import { Meteor } from 'meteor/meteor';
import { Loader, Header, Menu, Segment, Card, Grid, Button, Form } from 'semantic-ui-react';
import { withTracker } from 'meteor/react-meteor-data';
import PropTypes from 'prop-types';
import ClubCard from '../components/ClubCard';
import { Clubs } from '../../api/club/Club';
import { Interests } from '../../api/interest/Interest';

/** Renders a table containing all of the Stuff documents. Use <StuffItem> to render each row. */
class ClubExplorer extends React.Component {
  /** If the subscription(s) have been received, render the page, otherwise show a loading icon. */

  state = { selectedTags: [], pageNumber: 0, search: '', cardCount: 0 };

  render() {
    return this.props.ready ? this.renderPage() : <Loader active>Getting data</Loader>;
  }


  displayCards(display) {
    if (this.state.search === '') {
      return display.map((club, index) => <ClubCard key={index} club={club} style={{ padding: '20px 20px 20px 20px' }}/>);
    } else {
      return display.map((club, index) => (club.name.toLowerCase().indexOf(this.state.search.toLowerCase()) > -1 ? this.getCard(club, index) : ''));
    }

  }

  getCard(club, index) {
    return <ClubCard key={index} club={club} style={{ padding: '20px 20px 20px 20px' }}/>;
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

  /** Render the page once subscriptions have been received. */
  renderPage() {
    const display = Clubs.find({}).fetch().filter((club) => (this.doesClubMatchInterest(club)));
    const interestMatchLength = display.length;
    //display = display.filter((club, index) => index >= this.state.pageNumber * 12 && index < (this.state.pageNumber + 1) * 12);
    return (
        <div className="club-explorer-background">
          <Menu id='navbar' borderless style={{ marginBottom: '30px' }}>
            <Menu.Item key='searchbar'>
              <Form >
                <Form.Input onChange={this.handleChange} name='search'
                            className='icon' icon='search' placeholder='Search...' />
              </Form>
            </Menu.Item>
          </Menu>
            <Grid>
            <Grid.Column width={3}>
              <Menu inverted fitted fluid vertical tabular>
                <Segment>
                {Interests.find({}).fetch().map((interest, index) => <Menu.Item key={index} style={{ color: this.state.selectedTags.includes(interest.name) ? 'green' : 'black' }}
                                             content={interest.name}
                                             onClick={() => this.selectTag(interest.name)}/>)}
                </Segment>
              </Menu>
            </Grid.Column>
            <Grid.Column width={12} relaxed>
              {
                // eslint-disable-next-line max-len
                    <Card.Group centered stretched relaxed fluid itemsPerRow={5}>

                      {/* eslint-disable-next-line no-nested-ternary,max-len */}
                      {this.displayCards(display)}

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
