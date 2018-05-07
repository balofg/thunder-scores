import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { history as historyPropTypes } from 'history-prop-types';

import NumberInput from '../../components/NumberInput';

class Game extends Component {
  constructor(props) {
    super(props);

    this.state = {};
    this.betFocusHandlers = {};
    this.resultFocusHandlers = {};

    this.registerBetFocusHandler = this.registerBetFocusHandler.bind(this);
    this.registerResultFocusHandler = this.registerResultFocusHandler.bind(this);
    this.unregisterBetFocusHandler = this.unregisterBetFocusHandler.bind(this);
    this.unregisterResultFocusHandler = this.unregisterResultFocusHandler.bind(this);

    this.canBet = this.canBet.bind(this);
    this.canClose = this.canClose.bind(this);
    this.checkData = this.checkData.bind(this);
    this.placeBet = this.placeBet.bind(this);

    this.onCardsCountChange = this.onCardsCountChange.bind(this);
    this.onDealerChange = this.onDealerChange.bind(this);
    this.onBetChange = this.onBetChange.bind(this);
    this.onResultChange = this.onResultChange.bind(this);
  }

  componentWillMount() {
    if (this.props.players.length === 0) {
      this.props.history.push('players');
    }

    this.checkData(this.props, true);
  }

  componentWillReceiveProps(nextProps) {
    this.checkData(nextProps, nextProps.hand !== this.props.hand);
  }

  checkData({ hand, players, nextDealerId }, reset) {
    this.setState({
      hand: hand ? undefined : {
        cardsCount: 1,
        dealerId: nextDealerId,
      },
      bets: players.reduce(
        (bets, { id }) => ({
          ...bets,
          [id]: bets[id] || undefined,
        }),
        reset ? {} : (this.state.bets || {}),
      ),
      results: players.reduce(
        (results, { id }) => ({
          ...results,
          [id]: results[id] || undefined,
        }),
        reset ? {} : (this.state.results || {}),
      ),
    });

    if (!hand) return;

    const bets = players.map(({ bet }) => bet || {});

    const closedBets = bets.filter(({ status }) => status === 'CLOSED');

    if (closedBets.length < bets.length) {
      const totalResults = bets.reduce(
        (sum, { result }) => sum + (result || 0),
        0,
      );

      if (bets.length - closedBets.length === 1) {
        const openBet = bets.find(({ status }) => status === 'OPEN');
        if (openBet) {
          this.props.closeBet(openBet, hand.cardsCount - totalResults);
        }
      } else if (totalResults === hand.cardsCount) {
        bets
          .filter(({ status }) => status === 'OPEN')
          .forEach(bet => this.props.closeBet(bet, 0));
      }
    }
  }

  componentDidUpdate() {
    const { players } = this.props;

    if (this.lastCommit) {
      if (players.filter(({ bet }) => bet).length < players.length) {
        const filteredPlayers = players.filter(({ id, bet }) => id === this.lastCommit || !bet);
        const playerIndex = filteredPlayers.findIndex(({ id }) => id === this.lastCommit);
        if (playerIndex > -1) {
          const nextPlayerId = filteredPlayers[(playerIndex + 1) % filteredPlayers.length].id;
          if (nextPlayerId in this.betFocusHandlers) {
            this.betFocusHandlers[nextPlayerId].focus();
            this.lastCommit = undefined;
          }
        }
      } else {
        this.lastCommit = undefined;
      }
    }
  }

  registerBetFocusHandler(playerId, handler) {
    this.betFocusHandlers = {
      ...this.betFocusHandlers,
      [playerId]: handler,
    };
  }

  unregisterBetFocusHandler(playerId) {
    const { [playerId]: handler, ...betFocusHandlers } = this.betFocusHandlers;
    this.betFocusHandlers = betFocusHandlers;
  }

  registerResultFocusHandler(playerId, handler) {
    this.resultFocusHandlers = {
      ...this.resultFocusHandlers,
      [playerId]: handler,
    };
  }

  unregisterResultFocusHandler(playerId) {
    const { [playerId]: handler, ...resultFocusHandlers } = this.resultFocusHandlers;
    this.resultFocusHandlers = resultFocusHandlers;
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

  canClose(overridePlayer = undefined, overrideValue = 0) {
    const totalResultsValue = this.props.players.reduce(
      (value, { id, bet }) => {
        if (id === overridePlayer) {
          return value + overrideValue;
        }

        if (bet && bet.result !== undefined) {
          return value + bet.result;
        }

        if (this.state.results[id] !== undefined) {
          return value + this.state.results[id];
        }

        return value;
      },
      0,
    );

    if (
      totalResultsValue > this.props.hand.cardsCount
      || (
        this.props.players.filter(({ bet }) => bet && bet.result === undefined).length === 1
        && totalResultsValue !== this.props.hand.cardsCount
      )
    ) {
      return false;
    }

    return true;
  }

  placeBet(playerId) {
    const { hand, placeBet } = this.props;
    const { bets: { [playerId]: value } } = this.state;
    if (hand) {
      placeBet(playerId, hand.id, value);
      this.lastCommit = playerId;
    }
  }

  render() {
    const {
      players,
      hand,
      handsCount,
      dealHand,
      closeHand,
      abortHand,
      closeBet,
    } = this.props;

    const doneBetting = players.length && !players.some(({ bet }) => !bet);
    const donePlaying =
      players.length && !players.some(({ bet }) => !bet || bet.result === undefined);

    const totalBetsValue = doneBetting ? players.reduce(
      (value, { bet }) => value + bet.value,
      0,
    ) : undefined;

    return (
      <div className="section">
        <div className="container">
          <div className="content">
            {hand && hand.status === 'OPEN' ? (
              <div className="columns">
                <div className="column is-8">
                  <h2 className="is-size-2">
                    {hand.cardsCount} card{hand.cardsCount > 1 ? 's' : ''} hand
                  </h2>
                </div>
                <div className="column is-4">
                  <div className="field is-grouped is-flex" style={{ justifyContent: 'flex-end' }}>
                    <div className="control">
                      <button
                        className="button"
                        onClick={() => abortHand(hand)}
                      >
                        Undo hand
                      </button>
                    </div>
                    <div className="control">
                      <button
                        className="button is-primary"
                        disabled={!donePlaying}
                        onClick={() => closeHand(hand)}
                      >
                        Close hand
                      </button>
                    </div>
                  </div>
                </div>
              </div>
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
                      className="button is-primary"
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

          {!!handsCount && (
            <p className="content">Previous hands: {handsCount}</p>
          )}

          {doneBetting && (
            <p className="content">
              Total bets value: {totalBetsValue}<br />
              Delta: {totalBetsValue - hand.cardsCount > 0 ? '+' : ''}{totalBetsValue - hand.cardsCount}
            </p>
          )}

          <div className="columns is-multiline">
            {players.map(player => (
              <div className="column is-one-third" key={player.id}>
                <div className="card">
                  <div className="card-content">
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
                            placeholder="Bet value"
                            onChange={value => this.onBetChange(player.id, value)}
                            onEnter={() => {
                              if (this.state.bets[player.id] !== undefined && this.canBet()) {
                                this.placeBet(player.id);
                              }
                            }}
                            onRegisterFocusHandler={handler =>
                              this.registerBetFocusHandler(player.id, handler)}
                            onUnregisterFocusHandler={() =>
                              this.unregisterBetFocusHandler(player.id)}
                          />
                        </span>
                        <span className="control">
                          <button
                            className="button"
                            disabled={!this.canBet() || this.state.bets[player.id] === undefined}
                            onClick={() => this.placeBet(player.id)}
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

                    {player.bet && player.bet.status === 'OPEN' && doneBetting && (
                      <div className="columns is-mobile">
                        <div className="column is-4">
                          <button
                            className="button has-text-success"
                            disabled={!this.canClose(player.id, player.bet.value)}
                            onClick={() => closeBet(player.bet, player.bet.value)}
                          >
                            Win
                          </button>
                        </div>
                        <div className="column is-8">
                          <div className="field has-addons">
                            <span className="control">
                              <NumberInput
                                value={this.state.results[player.id]}
                                placeholder="Result"
                                onChange={value => this.onResultChange(player.id, value)}
                                onEnter={() => {
                                  if (
                                    this.state.results[player.id] !== undefined
                                    && this.canClose()
                                    && this.state.results[player.id] !== player.bet.value
                                  ) {
                                    closeBet(player.bet, this.state.results[player.id]);
                                  }
                                }}
                              />
                            </span>
                            <span className="control">
                              <button
                                className="button has-text-danger"
                                disabled={!this.canClose()
                                  || this.state.results[player.id] === undefined
                                  || this.state.results[player.id] === player.bet.value}
                                onClick={() => closeBet(player.bet, this.state.results[player.id])}
                              >
                                Lose
                              </button>
                            </span>
                          </div>
                        </div>
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

          <div className="content has-text-right">
            <button
              className="button"
              onClick={() => this.props.history.push('scores')}
            >
              <span className="icon is-small">
                <i className="fas fa-table" />
              </span>
              <span>Scoreboard</span>
            </button>
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
    bet: PropTypes.shape({
      id: PropTypes.string.isRequired,
      playerId: PropTypes.string.isRequired,
      status: PropTypes.oneOf(['OPEN', 'CLOSED']).isRequired,
      value: PropTypes.number.isRequired,
    }),
  })).isRequired,
  hand: PropTypes.shape({
    id: PropTypes.string.isRequired,
    dealerId: PropTypes.string.isRequired,
    cardsCount: PropTypes.number.isRequired,
    status: PropTypes.oneOf(['OPEN', 'CLOSED']).isRequired,
  }),
  dealHand: PropTypes.func.isRequired,
  closeHand: PropTypes.func.isRequired,
  placeBet: PropTypes.func.isRequired,
  closeBet: PropTypes.func.isRequired,
  abortHand: PropTypes.func.isRequired,
  history: PropTypes.shape(historyPropTypes).isRequired,
  handsCount: PropTypes.number.isRequired,
};

Game.defaultProps = {
  hand: undefined,
};

export default Game;
