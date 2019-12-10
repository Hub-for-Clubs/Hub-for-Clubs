import React from 'react';
import { Form, Grid, Header, Container, Image, Card, Icon } from 'semantic-ui-react';
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
        image: 'images/TestProfilePicture.jfif',
        leader: '',
        clubs: { joined: [], favorite: [] },
        interests: [],
        major: [],
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
        <div className="landing-body">
        <div className="img-background">
            <Image src="/images/hubforclubbackground.png" fluid />
            <Form.Input label="Name:" placeholder="John Doe" name="username" onChange={this.handleChange}/>
            
            <div className="content">
            <Header as="h1" size='medium' color='yellow'>
            Hub for Clubs
          </Header>
            <div className="description">
          <Header as="h3" inverted>
            With more than 200 registered clubs at the University of Hawai'i at Manoa, it can be challenging to find
            ones that align with your interests. Hub for Clubs provides a way for students to quickly search for
            clubs that are right for them!
          </Header>
          </div>
        </div>
        </div>
          <div className="featured-clubs">
          <Header as="h1" textAlign="center" size='huge' color='yellow'>
            Featured Clubs
          </Header>
          </div>
          <div className='card-layout'>
           <Card.Group centered>
            <Card>
              <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
              <Card.Content>
                <div className='card-description'>
                <Card.Header>PANDAS</Card.Header>
                <Card.Description>
                  Matthew is a musician living in Nashville.
                </Card.Description>
                </div>
              </Card.Content>
          <Card.Content extra>
                <a>
                  <Icon name='user' />
                  22 Members
                </a>
              </Card.Content>
            </Card>
             <Card>
               <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
               <Card.Content>
                 <div className='card-description'>
                   <Card.Header>PANDAS</Card.Header>
                   <Card.Description>
                     Matthew is a musician living in Nashville.
                   </Card.Description>
                 </div>
               </Card.Content>
               <Card.Content extra>
                 <a>
                   <Icon name='user' />
                   22 Members
                 </a>
               </Card.Content>
             </Card>
             <Card>
               <Image src='https://react.semantic-ui.com/images/avatar/large/matthew.png' wrapped ui={false} />
               <Card.Content>
                 <div className='card-description'>
                   <Card.Header>PANDAS</Card.Header>
                   <Card.Description>
                     Matthew is a musician living in Nashville.
                   </Card.Description>
                 </div>
               </Card.Content>
               <Card.Content extra>
                 <a>
                   <Icon name='user' />
                   22 Members
                 </a>
               </Card.Content>
             </Card>
           </Card.Group>
          </div>
        </div>
    );
  }
}



export default Signup;
