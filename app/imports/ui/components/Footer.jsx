import React from 'react';

/** The Footer appears at the bottom of every page. Rendered by the App Layout component. */
class Footer extends React.Component {
  render() {
    return (
        <footer className='footer'>
          <div className="ui center aligned container">
              Department of Information and Computer Sciences <br />
              University of Hawaii<br />
              Honolulu, HI 96822 <br />
            <a href="http://ics-software-engineering.github.io/meteor-application-template-react">Template Home Page</a>
          </div>
        </footer>
    );
  }
}

export default Footer;
