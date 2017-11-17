import merge from 'lodash/merge';

import { RECEIVE_SUBREDDITS, REMOVE_SUBREDDIT, RECEIVE_RESULTS, CLEAR_RESULTS, RECEIVE_ERRORS } from '../actions/subreddit_actions';

const defaultState = {
  searchResults: [],
  subscribedSubs: [{
    id: "2qh3l",
    name: "news",
    tagline: "All news, US and international.",
    url: "/r/news/",
  }],
  errors: [],
}

const SubredditsReducer = (state = defaultState, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_RESULTS:
      let results = [];
      action.searchResults.data.children.some(child => {
        let result = {
          url: child.data.url,
          name: child.data.display_name,
          tagline: child.data.title,
          id: child.data.id,
        };
        if (!state.subscribedSubs.some(i => i.id == result.id)) {
          results.push(result);
        }
        if (results.length >= 5) {
          return true;
        }
      });
      newState.searchResults = results;
      return newState;
    case RECEIVE_SUBREDDITS:
      newState.subscribedSubs = action.subscribedSubs;
      return newState;
    case REMOVE_SUBREDDIT:
      newState.subscribedSubs = newState.subscribedSubs.filter(sub =>
        sub.id !== action.unsubscribed.id
      );
      return newState;
    case CLEAR_RESULTS:
      newState.searchResults = [];
      return newState;
    case RECEIVE_ERRORS:
      newState.errors = action.errors;
    default:
      return state;
  }
};

export default SubredditsReducer;
