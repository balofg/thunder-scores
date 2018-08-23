import * as React from "react";
import { Route, Switch } from "react-router-dom";

import About from "./routes/About";
import Game from "./routes/Game";
import Index from "./routes/Index";
import Players from "./routes/Players";
import Scoreboard from "./routes/Scoreboard";

const App = () => (
  <Switch>
    <Route path="/" exact component={Index} />
    <Route path="/about" component={About} />
    <Route path="/players" component={Players} />
    <Route path="/game" component={Game} />
    <Route path="/scoreboard" component={Scoreboard} />
  </Switch>
);

export default App;
