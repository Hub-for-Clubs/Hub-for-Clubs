import React from 'react';
import { Meteor } from 'meteor/meteor';
import '../../../client/style.css';
import { Redirect } from 'react-router-dom';
import { Grid, Form } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    console.log(Meteor.user());
    return Meteor.user() ? <div>Hello</div> : <Signup/>;
  }
}

class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', email: '', password: '', error: '', redirectToReferer: false };
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  submit = () => {
    const { username, email, password } = this.state;
    Accounts.createUser({ username: username, email: email, password: password }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToReferer: true });
      }
    });
  }

  render() {
    const gridStyle = { paddingTop: '30px' };
    if (Meteor.user()) {
      return <Redirect to=''/>;
    }
    return (
        <div className="landing">
          <Grid style={ gridStyle } verticalAlign='middle' textAlign='center' container>
            <Grid.Column width={5}>
              <Grid.Row>
                <div className='description_title'>Finding Clubs That Are Right For You</div>
              </Grid.Row>
              <Grid.Row style={{ padding: '2em', textAlign: 'left' }}>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et
              dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex
              ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu
              fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt
              mollit anim id est laborum.
              </Grid.Row>
            </Grid.Column>

            <Grid.Column width={2}/>

            <Grid.Column width={5}>
              <Grid.Row>
                <h1 className='hc_green massive'>Hub for Clubs</h1>
              </Grid.Row>
              <Grid.Row>
                <Form className='sign_up_form' onSubmit={this.submit}>
                  <Form.Field>
                    <Form.Input fluid label='Username:' placeholder='Username' name='username'
                                onChange={this.handleChange}/>
                    <Form.Input fluid label='Email:' placeholder='Email' name='email' onChange={this.handleChange}/>
                    <Form.Input fluid label='Password:' placeholder='Password' name='password' type='password'
                                onChange={this.handleChange}/>
                    <Form.Button fluid className='sign_up_button' content='Sign Up'/>
                  </Form.Field>
                </Form>
              </Grid.Row>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

export default Landing;
