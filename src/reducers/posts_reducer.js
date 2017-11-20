import merge from 'lodash/merge';
import { RECEIVE_POSTS, CLEAR_POSTS, RECEIVE_ERRORS } from '../actions/post_actions';

const defaultState = {
  posts: [],
  errors: [],
}

const PostsReducer = (state = defaultState, action) => {
  Object.freeze(state);
  let newState = merge({}, state);
  switch (action.type) {
    case RECEIVE_POSTS:
      let postIds = {};
      newState.posts.forEach(post => postIds[post.id] = true);
      action.posts.data.children.forEach(child => {
        let post = {
          title: child.data.title,
          thumbnail: child.data.thumbnail,
          url: child.data.url,
          id: child.data.id,
          score: child.data.score,
          link: child.data.permalink,
          author: child.data.author,
          subredditID: child.data.subreddit_id,
          name: child.data.name,
          comments: child.data.num_comments,
          subreddit: child.data.subreddit_name_prefixed,
        }
        if (!(post.id in postIds)) {
          newState.posts.push(post);
        }
      });
      return newState;
    case CLEAR_POSTS:
      newState.posts = [];
      console.log(newState);
      return newState;
    case RECEIVE_ERRORS:
      newState.errors = action.errors;
      return newState;
    default:
      return state;
  }
};

export default PostsReducer;
