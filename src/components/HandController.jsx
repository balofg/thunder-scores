import React, { Component } from 'react';
import PropTypes from 'prop-types';

import NumberInput from './NumberInput';
import { handPropTypes, gamePropTypes, playerPropTypes } from '../types';

class HandController extends Component {
  constructor(props) {
    super(props);

    this.state = {
      dealerId: undefined,
      cardsCount: undefined,
      currentHand: undefined,
      previousHand: undefined,
    };

    this.checkData = this.checkData.bind(this);
    this.closeHand = this.closeHand.bind(this);
    this.abortHand = this.abortHand.bind(this);

    this.onCardsCountChanged = this.onCardsCountChanged.bind(this);
    this.onDealerIdChanged = this.onDealerIdChanged.bind(this);
  }

  componentWillMount() {
    this.checkData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.checkData(nextProps);
  }

  checkData(nextProps) {
    const { hands, players } = nextProps;

    if (!hands || !players) return;

    if (hands.length) {
      const currentHand = hands.find(({ status }) => status === 'OPEN');
      const previousHand = hands.length > 1 ? hands[hands.length - 2] : undefined;

      let dealerId = currentHand ? currentHand.dealerId : players[0].id;
      let cardsCount = currentHand ? currentHand.cardsCount : 1;

      if (!currentHand && previousHand) {
        const previousDealerIndex = players.find(({ id }) => id === previousHand.dealerId);
        dealerId = players[(previousDealerIndex + 1) % players.length].id;

        cardsCount = previousHand.cardsCount + 1;
      }

      this.setState({
        cardsCount,
        currentHand,
        previousHand,
        dealerId,
      });
    }
  }

  onCardsCountChanged(cardsCount) {
    this.setState({ cardsCount });
  }

  onDealerIdChanged(dealerId) {
    this.setState({ dealerId });
  }

  abortHand() {
    if (typeof this.props.abortHand === 'function') {
      this.props.abortHand(this.state.currentHand);
    }
  }

  closeHand() {
    if (typeof this.props.closeHand === 'function') {
      this.props.closeHand(this.state.currentHand);
    }
  }

  render() {
    const { currentHand } = this.state;
    const { players } = this.props;

    if (currentHand) {
      const dealerPlayer = players.find(({ id }) => id === currentHand.dealer);
      const { donePlaying } = this.props;

      return (
        <div className="section">
          <h2 className="title is-2">{dealerPlayer.name}&#39;s hand</h2>
          <h3 className="subtitle is-3">
            {currentHand.cardsCount} card{currentHand.cardsCount === 1 ? '' : 's'}
          </h3>
          <div className="content">
            <div className="field is-grouped">
              <div className="control">
                <button
                  className="button is-primary"
                  disabled={!donePlaying}
                  onClick={this.closeHand}
                >
                  Close hand
                </button>
              </div>

              <div className="control">
                <button className="button" onClick={this.abortHand}>
                  Abort hand
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    const { cardsCount, dealerId } = this.state;

    return (
      <div className="section">
        <h2 className="title is-2">New hand</h2>
        <div className="content">
          <div className="field">
            <label className="label">Number of cards</label>
            <div className="control">
              <NumberInput onChange={this.onCardsCountChanged} value={cardsCount} />
            </div>
          </div>

          <div className="field">
            <label className="label">Dealer</label>
            <div className="control">
              <div className="select">
                <select value={dealerId}>
                  {players.map(({ name, id }) => (
                    <option key={id} value={id}>
                      {name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          <div className="field is-grouped">
            <div className="control">
              <button className="button is-primary">Deal hand</button>
            </div>
            <div className="control">
              <button className="button">End game</button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

HandController.propTypes = {
  hands: PropTypes.arrayOf(handPropTypes).isRequired,
  players: PropTypes.arrayOf(playerPropTypes).isRequired,
  dealHand: PropTypes.func.isRequired,
  closeHand: PropTypes.func.isRequired,
  abortHand: PropTypes.func.isRequired,
  donePlaying: PropTypes.bool.isRequired,
  game: gamePropTypes.isRequired,
};

export default HandController;
