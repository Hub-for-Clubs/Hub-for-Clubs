import React from 'react';
import '../../../client/style.css';
import { Grid, Form } from 'semantic-ui-react';

/** A simple static component to render some text for the landing page. */
class Landing extends React.Component {
  render() {
    const gridStyle = { paddingTop: '30px' };
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
              <Form className='sign_up_form'>
                <Form.Field>
                  <Form.Input fluid label='Username:' placeholder='Username' />
                  <Form.Input fluid label='Email:' placeholder='Email'/>
                  <Form.Input fluid label='Password:' placeholder='Password' type='password'/>
                  <Form.Button fluid className='sign_up_button'>Sign Up</Form.Button>
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
