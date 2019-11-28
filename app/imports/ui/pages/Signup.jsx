import React from 'react';
import { Form, Grid } from 'semantic-ui-react';
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
    const gridStyle = { paddingTop: '30px' };
    return (
        <div className="container1" style={gridStyle}>
          <Grid verticalAlign='middle' textAlign='center' container>
            <Grid.Column className="signup_description" width={5}>
              <Grid.Row>
                <div>Finding Clubs That Are Right For You</div>
              </Grid.Row>
              <Grid.Row style={{ padding: '2em', textAlign: 'left' }}>
                When you start your life in college, it can often be challenging to find clubs that align with your
                interests.  This can be especially troubling since clubs are what helps define a person in their future
                careers, as well as helping people explore their interests and build a general sense of community.
              </Grid.Row>
            </Grid.Column>

            <Grid.Column width={2}/>

            <Grid.Column className="signup_form" width={5}>
              <Grid.Row>
                <h1>Hub for Clubs</h1>
              </Grid.Row>
              <Grid.Row>
                <Form onSubmit={this.submit}>
                  <Form.Field>
                    <Form.Input className="item" fluid label='Username:' placeholder='Username' name='username'
                                onChange={this.handleChange}/>
                    <Form.Input className="item" fluid label='Email:' placeholder='Email' name='email'
                                onChange={this.handleChange}/>
                    <Form.Input className="item" fluid label='Password:' placeholder='Password' name='password'
                                type='password' onChange={this.handleChange}/>
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

export default Signup;
