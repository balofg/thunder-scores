import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { createBrowserHistory } from 'history';
import { Router, Switch, Route } from 'react-router';

import '@fortawesome/fontawesome';
import '@fortawesome/fontawesome-free-solid';
import 'bulma/css/bulma.min.css';

import HomeRoute from './routes/Home';

import reducers from './store/reducers';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducers);
const history = createBrowserHistory();

const App = () => (
  <Provider store={store}>
    <Router history={history}>
      <Switch>
        <Route path="/" component={HomeRoute} exact />
      </Switch>
    </Router>
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
