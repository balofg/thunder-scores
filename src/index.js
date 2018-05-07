import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { createHashHistory } from 'history';
import { Router, Switch, Route } from 'react-router-dom';

import '@fortawesome/fontawesome';
import '@fortawesome/fontawesome-free-solid';
import 'bulma/css/bulma.min.css';
import './index.css';

import { version } from '../package.json';

import HomeRoute from './routes/Home';
import PlayersRoute from './routes/Players';
import GameRoute from './routes/Game';
import ScoreboardRoute from './routes/Scoreboard';

import reducers from './store/reducers';

const store = createStore(
  reducers,
  // eslint-disable-next-line no-underscore-dangle
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__(),
);

const history = createHashHistory();

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <div>
        <Switch>
          <Route path="/" component={HomeRoute} exact />
          <Route path="/players" component={PlayersRoute} />
          <Route path="/game" component={GameRoute} />
          <Route path="/scores" component={ScoreboardRoute} />
        </Switch>
        <div className="app-version">Thunder Scores v{version}</div>
      </div>
    </Router>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
