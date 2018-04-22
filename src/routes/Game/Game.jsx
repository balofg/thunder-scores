import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Game extends Component {
  render() {
    const { players } = this.props;
    return (
      <div className="section">
        <div className="container">
          <div className="content">
            <div className="field is-grouped">

            </div>
          </div>

          <div className="content">
            {players.map(player => (
              <div className="card" key={player.id}>
                <div className="card-content">
                  <p className="subtitle">
                    {player.name}
                  </p>
                  <p className="title is-size-1">
                    {player.score}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }
}

Game.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
  })).isRequired,
};

export default Game;
