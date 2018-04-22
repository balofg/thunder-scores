import React from 'react';

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
          <button className="button is-primary">
            <span className="icon is-small">
              <i className="fas fa-bolt" />
            </span>
            <span>New Game</span>
          </button>
        </div>
      </div>
    </div>
  </div>
);

export default HomeRoute;
