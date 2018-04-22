import React from 'react';
import ReactDOM from 'react-dom';

import '@fortawesome/fontawesome';
import '@fortawesome/fontawesome-free-solid';
import 'bulma/css/bulma.min.css';

import App from './App';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<App />, document.getElementById('root'));
registerServiceWorker();
