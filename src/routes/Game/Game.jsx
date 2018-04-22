import React from 'react';
import PropTypes from 'prop-types';

const Game = props => (
  <div className="section">
    <div className="container">
      <h1 className="title is-size-1">Players</h1>

      <div className="content">
        <ul>
          {props.players.map(player => (
            <li key={player.id}>{player.name} ({player.score})</li>
          ))}
        </ul>
      </div>
    </div>
  </div>
);

Game.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
  })).isRequired,
};

export default Game;
