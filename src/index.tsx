import * as React from "react";
import * as ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { applyMiddleware, createStore } from "redux";
import createSagaMiddleware from "redux-saga";

import { HashRouter } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";
import "bulma/css/bulma.min.css";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import reducers from "./store/reducers";
import sagas from "./store/sagas";

// import preloadedState from "./state";

import "./index.css";

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  reducers,
  // preloadedState,
  applyMiddleware(sagaMiddleware)
);

sagaMiddleware.run(sagas);

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById("root") as HTMLElement
);

registerServiceWorker();
