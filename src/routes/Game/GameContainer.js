import { connect } from 'react-redux';

import { dealHand, closeHand, placeBet, closeBet } from '../../store/actions';
import GameComponent from './Game';

const mapStateToProps = (state) => {
  const hand = state.hands.find(({ status }) => status === 'OPEN');
  return {
    players: state.players.map(player => ({
      ...player,
      score: player.scores[player.scores.length - 1].score,
      bet: state.bets.find(bet => bet.status === 'OPEN' && bet.playerId === player.id),
    })),
    hand,
    bets: state.bets.filter(bet => bet.handId === hand.id),
  };
};

const mapDispatchToProps = {
  dealHand,
  closeHand,
  placeBet,
  closeBet,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameComponent);
