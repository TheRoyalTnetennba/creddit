import React, { Component } from 'react';
import { connect } from 'react-redux';

import './selector.css'
import Layout from '../../layout/layout';
import { fetchSearchResults } from '../../../actions/subreddit_actions';

class Selector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      subreddits: ['News', 'Funny', 'Gifs'],
      newSub: '',
      results: [],
    };
  }

  componentWillMount() {
    this.setState({ subreddits: })
  }

  handleAdd(el) {
    let newSubs = this.state.subreddits
    newSubs.push(el);
    this.setState({ 
      subreddits: newSubs,
      newSub: '',
    });
  }

  handleDelete(el) {
    this.setState({ subreddits: this.state.subreddits.filter(i => i !== el) });
  }

  search(query) {
    this.props.fetchSearchResults(query);
  }

  handleInput(property) {
    return e => this.setState({ [property]: e.currentTarget.value });
  }

  render() {
    return (
      <section className="dropdown">
        <span className="fs30 cp">Subreddits <i class="fa fa-caret-down black fs25" aria-hidden="true" /></span>
          <div className="dropdown-content">
            <div className="fb jcsb aic">
              <input 
                type="text" 
                className="p10 fs30 fb f1 mw150 mt23" 
                value={this.state.newSub} 
                placeholder="Add New"
                onChange={this.handleInput('newSub')}/>
              <i class="fa fa-plus blue fs20 p10 cp ml10 mt23" aria-hidden="true" onClick={() => this.handleAdd(this.state.newSub)} />
            </div>
            {this.state.subreddits.map(el => 
            <div className="fb jcsb aic">
              <p className="fs30 f1 ml10">{el}</p>
              <i class="fa fa-times red fs20 mr10 cp" aria-hidden="true" onClick={() => this.handleDelete(el)} />
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
});

export default connect(mapStateToProps, mapDispatchToProps)(Selector);