import React, { Component } from 'react';
import PropTypes from 'prop-types';
import historyPropTypes from 'history-prop-types';
import { match } from 'react-router-prop-types';

import { getGame, getPlayersByGame } from '../api/games';

class GameRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      game: undefined,
      players: undefined,
    };

    this.loadGame = this.loadGame.bind(this);
  }

  componentWillMount() {
    if (this.props.match.params.id) {
      return this.loadGame();
    }

    return this.props.history.push('/');
  }

  async loadGame() {
    this.setState({ loading: true });

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

      this.setState({
        game,
        players,
        loading: false,
      });
    } catch (error) {
      this.props.history.push('/');
    }
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
