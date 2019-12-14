import React from 'react';
import { Form, Container } from 'semantic-ui-react';
import { Meteor } from 'meteor/meteor';
import { Accounts } from 'meteor/accounts-base';
import { Redirect } from 'react-router-dom';

/**
 * Signup component is similar to signin component, but we create a new user instead.
 */
class Signup extends React.Component {
  constructor(props) {
    super(props);
    this.state = { username: '', email: '', password: '', error: '', redirectToProfile: false };
  }

  handleChange = (e, { name, value }) => {
    this.setState({ [name]: value });
  }

  submit = () => {
    const { username, email, password } = this.state;
    Accounts.createUser({
      username: username,
      email: email,
      password: password,
      profile: {
        image: 'images/empty-profile.png',
        leader: '',
        clubs: { joined: [], favorite: [] },
        interests: [],
        majors: [],
      },
    }, (err) => {
      if (err) {
        this.setState({ error: err.reason });
      } else {
        this.setState({ error: '', redirectToProfile: true });
      }
    });
  }

  render() {
    if (this.state.redirectToProfile) {
      return <Redirect to={ `/profile/${Meteor.user()._id}` }/>;
    }
    return (
        <Container>
          <Form style={{ borderStyle: 'none', boxShadow: 'none' }} onSubmit={this.submit}>
          <Form.Field>
            <Form.Input className="item" fluid label='Name:' placeholder='John Doe' name='username'
                        onChange={this.handleChange}/>
            <Form.Input className="item" fluid label='Email:' placeholder='Email' name='email'
                        onChange={this.handleChange}/>
            <Form.Input className="item" fluid label='Password:' placeholder='Password' name='password'
                        type='password' onChange={this.handleChange}/>
            <Form.Button className="item" fluid content='Create Your Account'/>
          </Form.Field>
        </Form>
        </Container>
    );
  }
}
export default Signup;
