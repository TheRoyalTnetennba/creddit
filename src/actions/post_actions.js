import { viewSubreddit } from '../utils/api_utils';

export const RECEIVE_POSTS = 'RECEIVE_POSTS';
export const CLEAR_POSTS = 'CLEAR_POSTS';
export const RECEIVE_ERRORS = 'RECEIVE_ERRORS';

export const receivePosts = posts => ({
  type: RECEIVE_POSTS,
  posts,
});

export const clearPosts = () => ({
  type: CLEAR_POSTS,
});

export const fetchSubreddit = (url, after) => dispatch => (
  viewSubreddit(url, after)
    .then(response => response.json())
    .then(posts => {
      dispatch(receivePosts(posts));
    })
    .catch(error => dispatch(receiveErrors(error)))
);

export const receiveErrors = errors => ({
  type: RECEIVE_ERRORS,
  errors,
});
