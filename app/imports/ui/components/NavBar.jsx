import React from 'react';
import PropTypes from 'prop-types';
import { Meteor } from 'meteor/meteor';
import { withTracker } from 'meteor/react-meteor-data';
import { withRouter, NavLink } from 'react-router-dom';
import { Menu, Dropdown, Image, Input } from 'semantic-ui-react';
import { Roles } from 'meteor/alanning:roles';

/** The NavBar appears at the top of every page. Rendered by the App Layout component. */
class NavBar extends React.Component {
  render() {
    const menuStyle = { padding: '0px' };
    return (
      <Menu id='navbar' attached="top" borderless>
        <Menu.Item style={menuStyle} as={NavLink} activeClassName=""
                   exact to={this.props.currentUser === '' ? '' : `/profile/${Meteor.user()._id}`}>
          <Image size='tiny' src='/images/HubForClubsLogo.png'/>
        </Menu.Item>
        <Menu.Item as={NavLink} className="navitem" activeClassName="" exact to="/clubexplorer" key='clubexplorer'>
          Club Explorer
        </Menu.Item>
        <Menu.Item as={NavLink} className="navitem" activeClassName="" exact to="/randomizer/false" key='randomizer'>
          Random Club
        </Menu.Item>
        {this.props.currentUser ? (
            [<Menu.Item as={NavLink} className="navitem" activeClassName="" exact to="/randomizer/true" key='pseudo'>
              Random Suggestion
            </Menu.Item>,
              <Menu.Item as={NavLink} className="navitem" activeClassName="active" exact to="/announcements" key='list'>
                Announcements</Menu.Item>,
              <Menu.Item key='searchbar'>
                <Input className='icon' icon='search' placeholder='Search...' />
              </Menu.Item>]
        ) : ''}
        {Roles.userIsInRole(Meteor.userId(), 'leader') ? (
            // eslint-disable-next-line max-len
            <Menu.Item as={NavLink} className="navitem" activeClassName="active" exact to="/addannouncement" key='leader'>
              Post Announcement</Menu.Item>
        ) : ''}
        <Menu.Item position="right">
          {this.props.currentUser === '' ? (
              <Menu.Item className="navitem" as={NavLink} exact to="/signin">Sign In</Menu.Item>
          ) : (
            <Dropdown className="navitem" text={this.props.currentUser} pointing="top right" icon={'user'}>
              <Dropdown.Menu>
                <Dropdown.Item icon="sign out" text="Sign Out" as={NavLink} exact to="/signout"/>
              </Dropdown.Menu>
            </Dropdown>
          )}
        </Menu.Item>
      </Menu>
    );
  }
}

/** Declare the types of all properties. */
NavBar.propTypes = {
  currentUser: PropTypes.string,
  clubs: PropTypes.array,
};

/** withTracker connects Meteor data to React components. https://guide.meteor.com/react.html#using-withTracker */
const NavBarContainer = withTracker(() => ({
  currentUser: Meteor.user() ? Meteor.user().username : '',
}))(NavBar);

/** Enable ReactRouter for this component. https://reacttraining.com/react-router/web/api/withRouter */
export default withRouter(NavBarContainer);
