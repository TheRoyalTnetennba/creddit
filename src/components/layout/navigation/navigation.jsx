import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import './navigation.css';
import Selector from '../../feed/subreddit/selector';

class Navigation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: '',
    }
  }

  goHome() {
    if (this.props.location.pathname === '/') {
      return;
    }
    this.props.history.push('/');
  }

  render() {
    return (
      <nav className="white-b">
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

const mapStateToProps = state => ({
});

const mapDispatchToProps = dispatch => ({
});

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation));

