import merge from 'lodash/merge';
// import { RECEIVE_GAMES, RECEIVE_ERRORS, CLEAR_ERRORS } from '../actions/game_actions';

const PostsReducer = (state = {}, action) => {
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

export default PostsReducer;
