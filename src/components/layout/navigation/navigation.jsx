import React, { Component } from 'react';
import { withRouter } from 'react-router-dom';

import './navigation.css';
import Selector from '../../feed/subreddit/selector';

class Navigation extends Component {
  constructor(props) {
    super(props);
  }

  goHome() {
    if (this.props.location.pathname === '/') {
      return;
    }
    this.props.history.push('/');
  }

  render() {
    return (
      <nav className="white-b mb50">
        <div className="fb">
          <div className="fb cp" onClick={() => this.goHome()}>
            <h1 className="red">reddit</h1>
          </div>
        </div>
        <div className="fb">
          <Selector />
        </div>
      </nav>
    );
  }
}

export default withRouter(Navigation);

