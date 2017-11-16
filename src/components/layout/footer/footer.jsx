import React, { Component } from 'react';
import { connect } from 'react-redux';
import { SocialIcon } from 'react-social-icons';
import './footer.css';

class Footer extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <footer className="fb black-b white jcsa aic">
        <section className="ma">
          <h1>Follow Me</h1>
          <div className="social-buttons">
            <SocialIcon url="https://www.grahampaye.com/" color="#56B9D0" />
            <SocialIcon url="https://www.linkedin.com/in/graham-paye/" color="#56B9D0" />
            <SocialIcon url="https://github.com/TheRoyalTnetennba" color="#56B9D0" />
            <SocialIcon network="email" url="mailto:gpaye8@gmail.com" color="#56B9D0" className="cp" />
          </div>
        </section>
      </footer>
    );
  }
}

const mapStateToProps = state => ({
  state,
});

const mapDispatchToProps = dispatch => ({
});

export default connect(mapStateToProps, mapDispatchToProps)(Footer);