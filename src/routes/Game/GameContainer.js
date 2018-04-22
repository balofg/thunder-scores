import { connect } from 'react-redux';
import GameComponent from './Game.jsx';

const mapStateToProps = state => ({
  players: state.players.map(player => ({
    ...player,
    score: player.scores[player.scores.length - 1].score,
  })),
});

export default connect(mapStateToProps, null)(GameComponent);
