import { createStore, applyMiddleware, combineReducers } from 'redux';
import thunk from 'redux-thunk';
import createEngine from 'redux-storage-engine-localstorage';
import * as storage from 'redux-storage'

import SubredditsReducer from '../reducers/subreddits_reducer';
import PostsReducer from '../reducers/posts_reducer';

const engine = createEngine('credit-m4jf9aospquhnoasoiejrlaiek');

const reducer = storage.reducer(combineReducers({
  subreddits: SubredditsReducer,
  posts: PostsReducer,
}));

const middleware = storage.createMiddleware(engine);
 
const createStoreWithMiddleware = applyMiddleware(middleware)(createStore);

const store = createStoreWithMiddleware(reducer);

const load = storage.createLoader(engine);

load(store)
    .then((newState) => console.log('Loaded state:', newState))
    .catch(() => console.log('Failed to load previous state'));

export default store;
