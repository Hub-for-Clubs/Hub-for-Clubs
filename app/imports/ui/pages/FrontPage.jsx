import React from 'react';
import { Header, Button } from 'semantic-ui-react';
import '../../../client/style.css';

class FrontPage extends React.Component {
  render() {
    return (
        <div className="frontpage">
          <div className="background"></div>
          <Header className="heading" as="h2">Finding clubs that are right for you</Header>
          <Header className="description" as="h4">When you start your life in college, it can often be challenging to
            find clubs that align with your interests.  This can be especially troubling since clubs are what helps
            define a person in their future careers, as well as helping people explore their interests and build a
            general sense of community.</Header>
          <Button className="signup_button">Sign Up</Button>
        </div>
    );
  }
}

export default FrontPage;
