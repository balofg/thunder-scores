import { connect } from 'react-redux';

import { dealHand, closeHand, abortHand, placeBet, closeBet } from '../../store/actions';
import GameComponent from './Game';

const mapStateToProps = (state) => {
  const hand = state.hands.find(({ status }) => status === 'OPEN');
  return {
    hand,
    handsCount: state.hands.filter(({ status }) => status !== 'ABORTED').length - (hand ? 1 : 0),
    players: state.players.map(player => ({
      ...player,
      score: player.scores[player.scores.length - 1].score,
      bet: hand
        ? state.bets.find(bet => bet.handId === hand.id && bet.playerId === player.id)
        : undefined,
    })),
  };
};

const mapDispatchToProps = {
  dealHand,
  closeHand,
  abortHand,
  placeBet,
  closeBet,
};

export default connect(mapStateToProps, mapDispatchToProps)(GameComponent);
