import React from 'react';
import PropTypes from 'prop-types';
import { history as historyPropTypes } from 'history-prop-types';

const Scoreboard = props => (
  <div className="section">
    <div className="container">
      <div className="content">
        <h1 className="is-size-3">Scoreboard</h1>
      </div>

      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>Cards</th>
            {props.players.map(player => (
              <th key={player.id}>{player.name}</th>
            ))}
          </tr>
        </thead>

        <tbody>
          {props.hands.map(hand => (
            <tr key={`${hand.id}`}>
              <td>
                <strong>{hand.cards}</strong>
              </td>
              {props.players.map(({ id }) => {
                const bet = hand.bets.find(({ player }) => player === id);
                return (
                  <td
                    key={id}
                    className={`has-text-white has-background-${bet.hasLost ? 'danger' : 'success'}`}
                  >
                    {bet.isDealer && (
                      <span className="icon" style={{ marginRight: '15px' }}>
                        <i className="fas fa-star" />
                      </span>
                    )}

                    <span>{bet.score}</span>
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

Scoreboard.propTypes = {
  hands: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    cards: PropTypes.number.isRequired,
    bets: PropTypes.arrayOf(PropTypes.shape({
      player: PropTypes.string.isRequired,
      isDealer: PropTypes.bool.isRequired,
      score: PropTypes.number.isRequired,
      hasLost: PropTypes.bool.isRequired,
    })).isRequired,
  })).isRequired,
  players: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  })),
  history: PropTypes.shape(historyPropTypes).isRequired,
};

export default Scoreboard;
