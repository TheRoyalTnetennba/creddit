import merge from 'lodash/merge';

import { RECEIVE_SUBREDDITS, RECEIVE_RESULTS, RECEIVE_ERRORS } from '../actions/subreddit_actions';

const defaultState = {
  searchResults: [],
  subscribedSubs: ['news'],

}

const SubredditsReducer = (state = {}, action) => {
  Object.freeze(state);
  switch (action.type) {
    // case RECEIVE_GAMES:
    //   const games = action.games;
    //   let newGames = {};
    //   for (let i = 0; i < games.length; i++) {
    //     newGames[games[i]['slug']] = games[i]
    //   }
    //   return newGames;
    // case RECEIVE_ERRORS:
    //   const errors = action.errors;
    default:
      return state;
  }
};

export default SubredditsReducer;
