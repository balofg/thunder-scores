import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { history as historyPropTypes } from 'history-prop-types';

class Scoreboard extends Component {
  componentWillMount() {
    if (!this.props.players || !this.props.players.length) {
      this.props.history.push('players');
    }
  }

  render() {
    const { players, hands, history } = this.props;
    return (
      <div className="section">
        <div className="container">
          <div className="content">
            <h1 className="is-size-3">Scoreboard</h1>
          </div>

          <table className="table is-striped is-fullwidth">
            <thead>
              <tr>
                <th>Cards</th>
                {players.map(player => (
                  <th key={player.id}>{player.name}</th>
                ))}
              </tr>
            </thead>

            <tbody>
              {!hands.length && (
                <tr>
                  <td className="has-text-grey has-text-centered" colSpan={players.length + 1}>
                    Nothing to display
                  </td>
                </tr>
              )}
              {hands.map(hand => (
                <tr key={`${hand.id}`}>
                  <td>
                    <strong>{hand.cards}</strong>
                  </td>
                  {players.map(({ id }) => {
                    const bet = hand.bets.find(({ player }) => player === id);
                    return (
                      <td key={id}>
                        <span
                          className={`has-text-${bet.hasLost ? 'danger' : 'success'}`}
                        >
                          {bet.score}
                        </span>

                        <span style={{ marginLeft: '15px' }}>
                          ({bet.value})
                        </span>

                        {bet.isDealer && (
                          <span className="icon has-text-grey-lighter" style={{ marginLeft: '15px' }}>
                            <i className="fas fa-star" />
                          </span>
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>

          <div className="content has-text-right">
            <button
              className="button"
              onClick={() => history.push('game')}
            >
              <span className="icon is-small">
                <i className="fas fa-arrow-left" />
              </span>
              <span>Back to game</span>
            </button>
          </div>
        </div>
      </div>
    );
  }
}

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
