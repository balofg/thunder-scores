import React, { Component } from 'react';
import PropTypes from 'prop-types';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {
      hand: {
        cardsCount: 1,
        dealerId: undefined,
      },
    };

    this.onCardsCountChange = this.onCardsCountChange.bind(this);
    this.onDealerChange = this.onDealerChange.bind(this);
  }

  onCardsCountChange({ target: { value } }) {
    this.setState({ hand: { ...this.state.hand, cardsCount: value } });
  }

  onDealerChange({ target: { value } }) {
    this.setState({ hand: { ...this.state.hand, dealerId: value } });
  }

  render() {
    const { players, hand } = this.props;
    return (
      <div className="section">
        <div className="container">
          <div className="content">
            {hand && hand.status === 'OPEN' ? (
              <h1 className="is-size-3">
                {hand.cardsCount} card{hand.cardsCount > 1 ? 's' : ''}
              </h1>
            ) : (
              <div className="columns">
                <div className="column">
                  <div className="field">
                    <div className="control">
                      <label className="label">Number of cards</label>
                      <input
                        className="input"
                        type="number"
                        min="1"
                        max={Math.floor(52 / players.length)}
                        onChange={this.onCardsCountChange}
                      />
                    </div>
                  </div>
                </div>

                <div className="column">
                  <div className="field">
                    <div className="control">
                      <label className="label">Dealer</label>
                      <div className="select" style={{ width: '100%' }}>
                        <select
                          value={this.state.hand.dealerId}
                          style={{ width: '100%' }}
                          onChange={this.onDealerChange}
                        >
                          {players.map(player => (
                            <option
                              value={player.id}
                              key={player.id}
                            >
                              {player.name}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="column" style={{ display: 'flex' }}>
                  <button
                    className="button is-primary"
                    style={{ alignSelf: 'flex-end' }}
                    disabled={!this.state.hand.dealerId || !this.state.hand.cardsCount}
                    onClick={() => console.log(this.state)}
                  >
                    <span className="icon is-small">
                      <i className="fas fa-hand-paper" />
                    </span>
                    <span>Deal hand</span>
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="content has-text-centered">
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

const betShape = PropTypes.shape({
  id: PropTypes.string.isRequired,
  playerId: PropTypes.string.isRequired,
  status: PropTypes.oneOf(['OPEN', 'WON', 'LOST']).isRequired,
  value: PropTypes.number.isRequired,
});

Game.propTypes = {
  players: PropTypes.arrayOf(PropTypes.shape({
    name: PropTypes.string.isRequired,
    id: PropTypes.string.isRequired,
    score: PropTypes.number.isRequired,
    bet: betShape,
  })).isRequired,
  hand: PropTypes.shape({
    id: PropTypes.string.isRequired,
    dealerId: PropTypes.string.isRequired,
    status: PropTypes.string.isRequired,
  }),
  bets: PropTypes.arrayOf(betShape).isRequired,
};

Game.defaultProps = {
  hand: undefined,
};

export default Game;
