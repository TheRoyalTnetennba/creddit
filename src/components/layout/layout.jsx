import React, { Component } from 'react';

import Navigation from './navigation/navigation';
import Footer from './footer/footer';
import './colors.css';
import './layout.css';

class Layout extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <main id="main-wrapper" className="black white-b">
        <Navigation />
          {this.props.children}
        <Footer />
      </main>
    );
  }
}

export default Layout;
