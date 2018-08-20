import * as React from "react";
import * as ReactDOM from "react-dom";
import App from "./App";
import "./index.css";
import registerServiceWorker from "./registerServiceWorker";

import "@fortawesome/fontawesome-free/css/fontawesome.min.css";
import "@fortawesome/fontawesome-free/css/solid.min.css";
import "bulma/css/bulma.min.css";

ReactDOM.render(<App />, document.getElementById("root") as HTMLElement);
registerServiceWorker();
