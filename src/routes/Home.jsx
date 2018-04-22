import React from 'react';
import { Link } from 'react-router-dom';

const HomeRoute = () => (
  <div className="hero is-large">
    <div className="hero-body">
      <div className="container">
        <div className="title">
          Thunder Score Keeper
        </div>
        <div className="subtitle">
          Automatic score keeper for the &quot;Thunder&quot; card game
        </div>
        <div className="body">
          <Link to="/players" className="button is-primary">
            <span className="icon is-small">
              <i className="fas fa-bolt" />
            </span>
            <span>New Game</span>
          </Link>
        </div>
      </div>
    </div>
  </div>
);

export default HomeRoute;
