import { connect } from 'react-redux';

import { dealHand, closeHand, abortHand, placeBet, closeBet } from '../../store/actions';
import GameComponent from './Game';

const mapStateToProps = (state) => {
  const currentHand = state.hands.find(({ status }) => status === 'OPEN');
  const previousHands = state.hands.filter(({ status }) => status === 'CLOSED');

  let nextDealerId = state.players.length ? state.players[0].id : '';

  if (previousHands.length) {
    const lastDealerId = previousHands[previousHands.length - 1].dealerId;
    const lastDealerPlayerIndex = state.players.findIndex(({ id }) => id === lastDealerId);
    if (lastDealerPlayerIndex > -1) {
      nextDealerId = state.players[(lastDealerPlayerIndex + 1) % state.players.length].id;
    }
  }

  return {
    hand: currentHand,
    handsCount: previousHands.length,
    nextDealerId,
    players: state.players.map(player => ({
      ...player,
      score: player.scores[player.scores.length - 1].score,
      bet: currentHand
        ? state.bets.find(bet => bet.handId === currentHand.id && bet.playerId === player.id)
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
