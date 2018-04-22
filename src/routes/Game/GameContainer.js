import { connect } from 'react-redux';

import { dealHand, placeBet, winBet, loseBet, closeHand } from '../../store/actions';
import GameComponent from './Game.jsx';

const mapStateToProps = state => ({
  players: state.players.map(player => ({
    ...player,
    score: player.scores[player.scores.length - 1].score,
    bet: state.bets.find(bet => bet.status === 'OPEN' && bet.playerId === player.id),
  })),
  hand: state.hands.find(hand => hand.status === 'OPEN'),
  bets: state.bets.find(bet => bet.status === 'OPEN'),
});

const mapDispatchToProps = {
  dealHand,
  placeBet,
  winBet,
  loseBet,
  closeHand,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameComponent);
