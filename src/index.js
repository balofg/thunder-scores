import React from 'react';
import ReactDOM from 'react-dom';
import { createStore } from 'redux';
import { Provider } from 'react-redux';

import '@fortawesome/fontawesome';
import '@fortawesome/fontawesome-free-solid';
import 'bulma/css/bulma.min.css';

import reducers from './store/reducers';

import Main from './main';
import registerServiceWorker from './registerServiceWorker';

const store = createStore(reducers);

const App = () => (
  <Provider store={store}>
    <Main />
  </Provider>
);

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
