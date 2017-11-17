import React, { Component } from 'react';
import { connect } from 'react-redux';

import Layout from '../layout/layout';
import './feed.css';
import { fetchSubreddit, clearPosts } from '../../actions/post_actions';
import Post from './post';

class Feed extends Component {
  constructor(props) {
    super(props);
    this.state = {
      posts: [],
      page: 1,
      subscribedSubs: this.props.subreddits.subscribedSubs,
    };
  }

  componentWillMount() {
    window.addEventListener('scroll', () => this.onScroll, false);
    this.updateFeed();
  }

  componentWillReceiveProps(newProps) {
    let oldSubIds = {};
    this.props.subreddits.subscribedSubs.forEach(sub => 
      oldSubIds[sub.id] = true
    );
    let newSubIds = {};
    newProps.subreddits.subscribedSubs.forEach(sub =>
      newSubIds[sub.id] = true
    );
    let update = false;
    Object.keys(oldSubIds).forEach(id => {
      if (!(id in newSubIds)) {
        update = true;
      }
    });
    Object.keys(newSubIds).forEach(id => {
      if (!(id in oldSubIds)) {
        update = true;
      }
    });
    if (update) {
      this.setState({ 
        posts: newProps.posts.posts,
        subscribedSubs: newProps.subreddits.subscribedSubs,
      }, () => this.updateFeed());
    } else {
      this.setState({
        posts: newProps.posts.posts,
        subscribedSubs: newProps.subreddits.subscribedSubs,
      });
    }
  }

  onScroll() {
    if (
      (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 500) &&
      this.props.list.length
    ) {
      // get moar posts
      // this.props.onPaginatedSearch();
    }
  }

  updateFeed() {
    this.state.subscribedSubs.forEach(sub => {
      this.props.fetchSubreddit(sub.url)
    });
  }

  render() {
    console.log('state', this.state);
    return (
      <Layout>
        {this.state.posts.map(e => <Post key={e.id} post={e} />)}
      </Layout>
    );
  }
}

const mapStateToProps = state => ({
  subreddits: state.subreddits,
  posts: state.posts,
});

const mapDispatchToProps = dispatch => ({
  fetchSubreddit: (url, after = false) => dispatch(fetchSubreddit(url, after)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feed);