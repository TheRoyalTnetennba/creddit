import { searchSubreddits } from '../utils/api_utils';

export const RECEIVE_SUBREDDITS = 'RECEIVE_SUBREDDITS';
export const RECEIVE_RESULTS = 'RECEIVE_RESULTS';
export const REMOVE_SUBREDDIT = 'REMOVE_SUBREDDIT';
export const CLEAR_RESULTS = 'CLEAR_RESULTS';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

export const receiveSubs = subs => ({
  type: RECEIVE_SUBREDDITS,
  subscribedSubs: subs,
})

export const receiveResults = results => ({
  type: RECEIVE_RESULTS,
  searchResults: results,
});

export const clearResults = () => ({
  type: CLEAR_RESULTS,
  searchResults: [],
});

export const unsubscribe = unsubscribed => ({
  type: REMOVE_SUBREDDIT,
  unsubscribed,
})

export const fetchSearchResults = query => dispatch => (
  searchSubreddits(query)
    .then(response => response.json())
    .then(results => {
      dispatch(receiveResults(results));
      dispatch(receiveErrors());
    })
    .catch(error => dispatch(receiveErrors(error)))
);

export const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors,
});
