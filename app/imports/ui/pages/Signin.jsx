import React from 'react';
import PropTypes from 'prop-types';
import { Link, Redirect } from 'react-router-dom';
import { Meteor } from 'meteor/meteor';
import '../../../client/style-Jolie.css';
import { Header, Button, Container, Image, Form, Segment } from 'semantic-ui-react';

/**
 * Signin page overrides the form’s submit event and call Meteor’s loginWithPassword().
 * Authentication errors modify the component’s state to be displayed
 */
export default class Signin extends React.Component {

  /** Initialize component state with properties for login and redirection. */
  constructor(props) {
    super(props);
    this.state = { email: '', password: '', error: '', redirectToReferer: false };
  }

  /** Update the form controls each time the user interacts with them. */
  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  /** Handle Signin submission using Meteor's account mechanism. */
  submit = () => {
    const { email, password } = this.state;
    Meteor.loginWithPassword(email, password, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  /** Render the signin form. */
  render() {
    const { from } = this.props.location.state || { from: { pathname: '/' } };
    // if correct authentication, redirect to page instead of login screen
    if (this.state.redirectToReferer) {
      return <Redirect to={from}/>;
    }
    // Otherwise return the Login form.
    return (
        <Container>
          <div className="container1">
            <div className="welcome">
            <div className="box">
              <div className="myh1">
                <Header as="h1" inverted className="myh1">SIGN IN</Header>
              </div>
                <Form className = "form" onSubmit={this.submit}>
                    <Form.Input
                        label="Email"
                        icon="user"
                        iconPosition="left"
                        name="email"
                        type="email"
                        placeholder="E-mail address"
                        onChange={this.handleChange}
                    />
                    <Form.Input 
                        label="Password"
                        icon="lock"
                        iconPosition="left"
                        name="password"
                        placeholder="Password"
                        type="password"
                        onChange={this.handleChange}
                    />
                  <Form.Button content="Submit"/>
                  <Button color='blue' className="button2">submit</Button>
                  <Link to="/AnnoucementBoard">Click here for announcements</Link>
                </Form>
            </div>
              <div className="rightbox">
                <div className="title">
              <Header as="h2" color='gray'>HUB FOR CLUBS</Header>
              <Header as="h5" className="p"> find your perfect club </Header>
              <Image className="logo" src="images/HubForClubsLogo.png"/>
              <Header as="h5" className="p signup">don't have an account?</Header>
              <Button basic color='green' className="button2">sign up</Button>
                </div>
            </div>
          </div>
        </div>
        </Container>
    );
  }
}

/** Ensure that the React Router location object is available in case we need to redirect. */
Signin.propTypes = {
  location: PropTypes.object,
};
