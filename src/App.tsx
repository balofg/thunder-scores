import * as React from "react";
import { Route, Switch } from "react-router-dom";

import About from "./routes/About";
import Index from "./routes/Index";
import Players from "./routes/Players";

const App = () => (
  <Switch>
    <Route path="/" exact component={Index} />
    <Route path="/about" component={About} />
    <Route path="/players" component={Players} />
  </Switch>
);

export default App;
