import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NumberInput from './NumberInput';
import { betPropTypes, playerPropTypes, handPropTypes } from '../types';

class BetController extends Component {
  constructor(props) {
    super(props);

    this.state = {
      value: undefined,
      result: undefined,
      isValueValid: false,
      isResultValid: false,
    };

    this.onValueChange = this.onValueChange.bind(this);
    this.onResultChange = this.onResultChange.bind(this);
    this.placeBet = this.placeBet.bind(this);
    this.closeBet = this.closeBet.bind(this);
  }

  onValueChange(value) {
    this.setState({ value, isValueValid: this.props.validateBetValue(value) });
  }

  onResultChange(result) {
    this.setState({ result, isResultValid: this.props.validateBetResult(result) });
  }

  placeBet() {
    this.props.placeBet(this.state.value);
  }

  closeBet() {
    this.props.closeBet(this.state.result);
  }

  render() {
    const {
      bet,
      doneBetting,
      hand,
      player,
    } = this.props;

    const {
      value,
      result,
      isValueValid,
      isResultValid,
    } = this.state;

    return (
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

          {!bet && (
            <div className="field has-addons" style={{ justifyContent: 'center' }}>
              <span className="control">
                <NumberInput
                  value={value}
                  placeholder="Bet value"
                  onChange={this.onValueChange}
                  onEnter={isValueValid ? this.placeBet : undefined}
                />
              </span>
              <span className="control">
                <button
                  className="button"
                  disabled={!isValueValid}
                  onClick={this.placeBet}
                >
                  Place bet
                </button>
              </span>
            </div>
          )}

          {!!bet && (
            <div className="level is-mobile">
              <div className="level-left">
                <div className="level-item">Bet value</div>
              </div>
              <div className="level-right">
                <div className="level-item">
                  {bet.value}
                  {' / '}
                  {hand.cardsCount}
                </div>
              </div>
            </div>
          )}

          {!!bet && bet.status === 'OPEN' && doneBetting && (
            <div className="columns is-mobile">
              <div className="column is-4">
                <button
                  className="button has-text-success"
                  disabled={!isResultValid}
                  onClick={this.closeBet}
                >
                  Win
                </button>
              </div>
              <div className="column is-8">
                <div className="field has-addons">
                  <span className="control">
                    <NumberInput
                      value={result}
                      placeholder="Result"
                      onChange={this.onResultChange}
                      onEnter={isResultValid && result !== bet.value ? this.closeBet : undefined}
                    />
                  </span>
                  <span className="control">
                    <button
                      className="button has-text-danger"
                      disabled={isResultValid && result !== bet.value}
                      onClick={this.closeBet}
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

        {!!bet && bet.status === 'CLOSED' && bet.value === bet.result && (
          <footer className="card-footer">
            <div className="card-footer-item has-background-success has-text-white">
              <span className="icon is-big">
                <i className="fas fa-check" />
              </span>

              <span>WON</span>
            </div>
          </footer>
        )}

        {!!bet && bet.status === 'CLOSED' && bet.value !== bet.result && (
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
    );
  }
}

BetController.propTypes = {
  doneBetting: PropTypes.bool.isRequired,
  hand: handPropTypes.isRequired,
  player: playerPropTypes.isRequired,
  validateBetValue: PropTypes.func.isRequired,
  validateBetResult: PropTypes.func.isRequired,
  placeBet: PropTypes.func.isRequired,
  closeBet: PropTypes.func.isRequired,
  bet: betPropTypes,
};

BetController.defaultProps = {
  bet: undefined,
};

export default BetController;
