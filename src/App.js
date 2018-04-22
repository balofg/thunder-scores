import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div className="hero is-large">
        <div className="hero-body">
          <div className="container">
            <div className="title">
              Thunder Score Keeper
            </div>
            <div className="subtitle">
              Automatic score keeper for the "Thunder" card game
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
  }
}

export default App;
