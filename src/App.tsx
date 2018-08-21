import * as React from "react";
import { Route, Switch } from "react-router-dom";

import About from "./routes/About";
import Index from "./routes/Index";

const App = () => (
  <Switch>
    <Route path="/" exact component={Index} />
    <Route path="/about" component={About} />
  </Switch>
);

export default App;
