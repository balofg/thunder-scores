import * as React from "react";
import { Route } from "react-router";

const IndexRoute = () => (
  <div className="hero is-fullheight">
    <div className="hero-body">
      <div className="container">
        <h1 className="title">Thunder Scores</h1>
        <h2 className="subtitle">Automatic score-keeping tool</h2>
        <a className="button is-primary" href="#/players">
          <span className="icon">
            <i className="fas fa-bolt" />
          </span>
          <span>New game</span>
        </a>
      </div>
    </div>
  </div>
);

export default IndexRoute;
