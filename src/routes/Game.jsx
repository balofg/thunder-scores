import React, { Component } from 'react';
import PropTypes from 'prop-types';
import historyPropTypes from 'history-prop-types';
import { match } from 'react-router-prop-types';

import { getGame, getPlayersByGame } from '../api/games';
import { getHandsByGame } from '../api/hands';
import { getBetsByGame } from '../api/bets';

class GameRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      game: undefined,
      players: undefined,
      bets: undefined,
      hands: undefined,
    };

    this.checkData = this.checkData.bind(this);
    this.loadGame = this.loadGame.bind(this);
  }

  componentWillMount() {
    this.checkData(this.props);
  }

  componentWillReceiveProps(nextProps) {
    this.checkData(nextProps);
  }

  async loadGame() {
    const { match: { params: { id } } } = this.props;

    try {
      const game = await getGame(id);

      if (game.status !== 'OPEN') {
        this.props.history.push('scores');
        return;
      }

      if (!game) {
        throw new Error('Game not found');
      }

      const players = await getPlayersByGame(id);

      if (!players || !players.length) {
        throw new Error('Players not found');
      }

      const hands = await getHandsByGame(id) || [];
      const bets = await getBetsByGame(id) || [];

      this.setState({
        game,
        players,
        hands,
        bets,
      });
    } catch (error) {
      this.props.history.push('/');
    }
  }

  checkData({ match: { params: { id: gameId } } }) {
    const { game } = this.state;

    if (!game || game.id !== gameId) {
      return this.loadGame();
    }

    return this.props.history.push('/');
  }

  render() {
    return (
      <div>
        <pre>
          {JSON.stringify(this.state.game, null, 4)}
        </pre>
        <pre>
          {JSON.stringify(this.state.players, null, 4)}
        </pre>
      </div>
    );
  }
}

GameRoute.propTypes = {
  history: PropTypes.shape(historyPropTypes),
  match: match.isRequired,
};

export default GameRoute;
