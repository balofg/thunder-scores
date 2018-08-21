import * as React from "react";
import * as ReactDOM from "react-dom";

import { Provider } from "react-redux";
import { createStore } from "redux";

import { HashRouter } from "react-router-dom";

import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";
import "bulma/css/bulma.min.css";

import App from "./App";
import registerServiceWorker from "./registerServiceWorker";
import reducers from "./store/reducers";

import "./index.css";

const store = createStore(reducers);

ReactDOM.render(
  <Provider store={store}>
    <HashRouter>
      <App />
    </HashRouter>
  </Provider>,
  document.getElementById("root") as HTMLElement
);

registerServiceWorker();
