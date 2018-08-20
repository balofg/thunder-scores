import * as React from 'react';

class App extends React.Component {
  public render() {
    return (
      <div className="hero is-fullheight">
        <div className="hero-body">
          <div className="container">
            <h1 className="title">Thunder Scores</h1>
            <h2 className="subtitle">Automatic score-keeping tool</h2>
            <button className="button is-primary">
              <span className="icon">
                <i className="fas fa-bolt" />
              </span>
              <span>New game</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
