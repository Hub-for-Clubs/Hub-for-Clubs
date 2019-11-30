import React from 'react';
import { Form, Grid, Header } from 'semantic-ui-react';
import { Accounts } from 'meteor/accounts-base';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
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
    return (
        <div className="signup" style={{ paddingTop: '30px' }}>
          <div className="background"/>
          <Grid verticalAlign='middle' textAlign='center' container>
            <Grid.Column className="description" width={10}>
              <Header className="heading" as="h1">Finding clubs that are right for you</Header>
              <Header className="description" as="h3">
                With more than 200 registered clubs at the University of Hawai'i at Manoa, it can be challenging to find
                ones that align with your interests. Hub for Clubs provides a way for students to quickly search for
                clubs that are right for them!</Header>
            </Grid.Column>
            <Grid.Column className="form" width={6}>
              <Grid.Row>
                <h1 style={{ marginTop: '2em' }}>Hub for Clubs</h1>
              </Grid.Row>
              <Grid.Row>
                <Form style={{ borderStyle: 'none', boxShadow: 'none' }} onSubmit={this.submit}>
                  <Form.Field>
                    <Form.Input className="item" fluid label='Username:' placeholder='Username' name='username'
                                onChange={this.handleChange}/>
                    <Form.Input className="item" fluid label='Email:' placeholder='Email' name='email'
                                onChange={this.handleChange}/>
                    <Form.Input className="item" fluid label='Password:' placeholder='Password' name='password'
                                type='password' onChange={this.handleChange}/>
                    <Form.Button className="item" fluid content='Create Your Account'/>
                  </Form.Field>
                </Form>
              </Grid.Row>
            </Grid.Column>
          </Grid>
        </div>
    );
  }
}

export default Signup;
