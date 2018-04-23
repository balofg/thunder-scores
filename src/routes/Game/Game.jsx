import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { history as historyPropTypes } from 'history-prop-types';

import NumberInput from '../../components/NumberInput';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {};

    this.onCardsCountChange = this.onCardsCountChange.bind(this);
    this.onDealerChange = this.onDealerChange.bind(this);
    this.onBetChange = this.onBetChange.bind(this);
    this.onResultChange = this.onResultChange.bind(this);
    this.canBet = this.canBet.bind(this);
    this.checkData = this.checkData.bind(this);
  }

  componentWillMount() {
    if (this.props.players.length === 0) {
      this.props.history.push('players');
    }

    this.checkData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.checkData(nextProps);
  }

  checkData({ hand, players }) {
    this.setState({
      hand: hand ? undefined : {
        cardsCount: 1,
        dealerId: '',
      },
      bets: players.reduce(
        (bets, { id }) => ({
          ...bets,
          [id]: bets[id] || undefined,
        }),
        this.state.bets || {},
      ),
      results: players.reduce(
        (results, { id }) => ({
          ...results,
          [id]: results[id] || undefined,
        }),
        this.state.results || {},
      ),
    });
  }

  onCardsCountChange(value) {
    this.setState({ hand: { ...this.state.hand, cardsCount: value } });
  }

  onDealerChange({ target: { value } }) {
    this.setState({ hand: { ...this.state.hand, dealerId: value } });
  }

  onBetChange(playerId, value) {
    if (value !== undefined && value > this.props.hand.cardsCount) {
      return;
    }

    this.setState({
      bets: {
        ...this.state.bets,
        [playerId]: value,
      },
    });
  }

  onResultChange(playerId, value) {
    if (value !== undefined && value > this.props.hand.cardsCount) {
      return;
    }

    this.setState({
      results: {
        ...this.state.results,
        [playerId]: value,
      },
    });
  }

  canBet() {
    const totalBetsValue = this.props.players.reduce(
      (value, { id, bet }) => {
        if (bet) {
          return value + bet.value;
        }

        if (this.state.bets[id] !== undefined) {
          return value + this.state.bets[id];
        }

        return value;
      },
      0,
    );

    if (
      totalBetsValue === this.props.hand.cardsCount
      && this.props.players.filter(({ bet }) => !bet).length === 1
    ) {
      return false;
    }

    return true;
  }

  render() {
    const {
      players,
      hand,
      bets,
      dealHand,
      closeHand,
      placeBet,
      closeBet,
    } = this.props;

    return (
      <div className="section">
        <div className="container">
          <div className="content">
            {hand && hand.status === 'OPEN' ? (
              <h1 className="is-size-3">
                {hand.cardsCount} card{hand.cardsCount > 1 ? 's' : ''} hand

                <button
                  className="button is-primary is-pulled-right"
                  disabled={!bets.length || bets.some(bet => bet.status === 'OPEN')}
                  onClick={() => closeHand(hand)}
                >
                  Close hand
                </button>
              </h1>
            ) : (
              <div className="columns">
                <div className="column">
                  <div className="field">
                    <div className="control">
                      <label className="label">Number of cards</label>
                      <NumberInput
                        onChange={this.onCardsCountChange}
                        value={this.state.hand.cardsCount}
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
                          <option disabled value="">Choose...</option>
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

                <div className="column is-flex" style={{ justifyContent: 'flex-end' }}>
                  <button
                    className="button is-primary is-pulled-right"
                    style={{ alignSelf: 'flex-end' }}
                    disabled={!this.state.hand.dealerId || !this.state.hand.cardsCount}
                    onClick={() => dealHand(this.state.hand.dealerId, this.state.hand.cardsCount)}
                  >
                    Deal hand
                  </button>
                </div>
              </div>
            )}
          </div>

          <div className="columns is-multiline">
            {players.map(player => (
              <div className="column is-one-third" key={player.id}>
                <div className="card">
                  <div className="card-content has-text-centered">
                    <div className="level is-mobile">
                      <div className="level-left">
                        <div className="level-item">
                          <p className="is-size-3">
                            {player.name}
                          </p>
                        </div>
                      </div>
                      <div className="level-right">
                        <div className="level-item">
                          <p className="is-size-1">
                            {player.score}
                          </p>
                        </div>
                      </div>
                    </div>

                    {!player.bet && !!hand && (
                      <div className="field has-addons" style={{ justifyContent: 'center' }}>
                        <span className="control">
                          <NumberInput
                            value={this.state.bets[player.id]}
                            onChange={value => this.onBetChange(player.id, value)}
                            placeholder="Bet value"
                          />
                        </span>
                        <span className="control">
                          <button
                            className="button"
                            disabled={!this.canBet() || this.state.bets[player.id] === undefined}
                            onClick={() => placeBet(player.id, hand.id, this.state.bets[player.id])}
                          >
                            Place bet
                          </button>
                        </span>
                      </div>
                    )}

                    {player.bet && (
                      <div className="level is-mobile">
                        <div className="level-left">
                          <div className="level-item">Bet value</div>
                        </div>
                        <div className="level-right">
                          <div className="level-item">
                            {player.bet.value}
                            {' / '}
                            {hand.cardsCount}
                          </div>
                        </div>
                      </div>
                    )}

                    {player.bet && player.bet.status === 'OPEN' && !players.some(({ bet }) => !bet) && (
                      <div className="field has-addons" style={{ justifyContent: 'center' }}>
                        <span className="control">
                          <NumberInput
                            value={this.state.results[player.id]}
                            onChange={value => this.onResultChange(player.id, value)}
                            placeholder="Result"
                          />
                        </span>
                        <span className="control">
                          <button
                            className="button"
                            disabled={this.state.results[player.id] === undefined}
                            onClick={() => closeBet(player.bet, this.state.results[player.id])}
                          >
                            End bet
                          </button>
                        </span>
                      </div>
                    )}

                    {player.bet && player.bet.status === 'CLOSED' && (
                      <div className="level is-mobile">
                        <div className="level-left">
                          <div className="level-item">Result</div>
                        </div>
                        <div className="level-right">
                          <div className="level-item">
                            {player.bet.result}
                            {' / '}
                            {player.bet.value}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  {player.bet && player.bet.status === 'CLOSED' && player.bet.value === player.bet.result && (
                    <footer className="card-footer">
                      <div className="card-footer-item has-background-success has-text-white">
                        <span className="icon is-big">
                          <i className="fas fa-check" />
                        </span>

                        <span>WON</span>
                      </div>
                    </footer>
                  )}

                  {player.bet && player.bet.status === 'CLOSED' && player.bet.value !== player.bet.result && (
                    <footer className="card-footer">
                      <div className="card-footer-item has-background-danger has-text-white">
                        <span className="icon is-big">
                          <i className="fas fa-times" />
                        </span>

                        <span>LOST</span>
                      </div>
                    </footer>
                  )}
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
  status: PropTypes.oneOf(['OPEN', 'CLOSED']).isRequired,
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
    cardsCount: PropTypes.number.isRequired,
    status: PropTypes.oneOf(['OPEN', 'CLOSED']).isRequired,
  }),
  bets: PropTypes.arrayOf(betShape).isRequired,
  dealHand: PropTypes.func.isRequired,
  closeHand: PropTypes.func.isRequired,
  placeBet: PropTypes.func.isRequired,
  closeBet: PropTypes.func.isRequired,
  history: PropTypes.shape(historyPropTypes).isRequired,
};

Game.defaultProps = {
  hand: undefined,
};

export default Game;
