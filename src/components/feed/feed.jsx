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
    window.addEventListener('scroll', () => this.onScroll(), false);
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
      console.log('should update here', newProps)
      this.setState({ 
        posts: newProps.posts.posts,
        subscribedSubs: newProps.subreddits.subscribedSubs,
      }, () => this.refreshPosts());
    } else {
      this.setState({
        posts: newProps.posts.posts,
        subscribedSubs: newProps.subreddits.subscribedSubs,
      });
    }
  }

  refreshPosts() {
    this.props.clearPosts();
    this.updateFeed();
  }

  incrementPage() {
    let lastPosts = {}
    this.state.posts.forEach(post => {
      lastPosts[post.subredditID] = post.name;
    });
    this.setState({ page: this.state.page + 1 }, () => this.updateFeed(lastPosts));
  }

  onScroll() {
    if (
      (window.innerHeight + window.scrollY) >= (document.body.offsetHeight - 400) &&
      this.state.posts.length
    ) {
      this.incrementPage();
    } 
  }

  updateFeed(afters = false) {
    if (afters) {
      this.state.subscribedSubs.forEach(sub => {
        let after = afters[sub.id];
        this.props.fetchSubreddit(sub.url, after);
      });
    } else {
      this.state.subscribedSubs.forEach(sub => {
        this.props.fetchSubreddit(sub.url)
      });
    }
  }

  render() {
    return (
      <Layout>
        <div className="mh697">
          {this.state.posts.map(e => <Post key={e.id} post={e} />)}
        </div>
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
  clearPosts: () => dispatch(clearPosts()),
});

export default connect(mapStateToProps, mapDispatchToProps)(Feed);