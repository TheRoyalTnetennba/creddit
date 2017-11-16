import React from 'react';
import { Provider } from 'react-redux';
import { HashRouter, Route, Switch } from 'react-router-dom';

import Feed from './components/feed/feed';


const App = ({ store }) => {
  return (
    <div className="App">
      <Provider store={store}>
        <HashRouter>
          <Switch>
            <Route path="/" exact component={Feed} />

          </Switch>
        </HashRouter>
      </Provider>
    </div>
  );
};

export default App;
