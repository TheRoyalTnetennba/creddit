import React, { Component } from 'react';
import { connect } from 'react-redux';

import './selector.css'
import Layout from '../../layout/layout';
import { fetchSearchResults, clearResults, unsubscribe, receiveSubreddits } from '../../../actions/subreddit_actions';

class Selector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subscribedSubs: [],
      newSub: '',
      searchResults: [],
    };
  }

  componentWillMount() {
    this.setState({ subscribedSubs: this.props.subreddits.subscribedSubs })
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      subscribedSubs: newProps.subreddits.subscribedSubs,
      searchResults: newProps.subreddits.searchResults,
    });
  }

  handleAdd(el) {
    this.props.receiveSubreddits(this.state.subscribedSubs.concat([el]))
    this.props.clearResults();
  }

  handleDelete(el) {
    this.props.unsubscribe(el);
  }

  search(query) {
    if (query.length === 0) {
      this.props.clearResults();
    } else {
      this.props.fetchSearchResults(query);
    }
  }

  handleInput(property) {
    return e => this.setState({ [property]: e.currentTarget.value }, () => this.search(this.state.newSub));
  }

  render() {
    return (
      <section className="dropdown">
        <span className="fs30 cp">Subreddits <i className="fa fa-caret-down black fs25" aria-hidden="true" /></span>
          <div className="dropdown-content white-b">
            <div className="fb jcsb aic">
              <input 
                type="text"
                className="p10 ml10 fs30 fb f1 mw150 mt23" 
                value={this.state.newSub} 
                placeholder="Add New"
                onChange={this.handleInput('newSub')}/>
              <i className="fa fa-search yellow fs20 cp ml20 mt23 pr40" aria-hidden="true"  />
            </div>
            {this.state.searchResults.map(el => 
            <div className="fb jcsb aic" key={`${el.id}`}>
              <p className="fs30 f1 ml10">{el.name}</p>
              <i className="fa fa-plus blue fs20 ml20 cp pr40" aria-hidden="true" onClick={() => this.handleAdd(el)} />
            </div>)}
            {this.state.subscribedSubs.map(el => 
            <div className="fb jcsb aic" key={`${el.id}`}>
              <p className="fs30 f1 ml10">{el.name}</p>
              <i className="fa fa-times red fs20 ml20 cp pr40" aria-hidden="true" onClick={() => this.handleDelete(el)} />
            </div>)}
          </div>
      </section>
    );
  }
}

const mapStateToProps = state => ({
  subreddits: state.subreddits,

});

const mapDispatchToProps = dispatch => ({
  fetchSearchResults: query => dispatch(fetchSearchResults(query)),
  clearResults: () => dispatch(clearResults()),
  unsubscribe: unsubscribed => dispatch(unsubscribe(unsubscribed)),
  receiveSubreddits: subscribedSubs => dispatch(receiveSubreddits(subscribedSubs)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Selector);