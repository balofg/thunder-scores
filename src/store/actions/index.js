import moment from 'moment';
import { v4 } from 'uuid';

export const startGame = playerNames => ({
  type: 'START_GAME',
  players: playerNames.map(name => ({
    name,
    id: v4(),
    scores: [{ score: 0 }],
  })),
});

export const dealHand = (dealerId, cardsCount) => ({
  type: 'DEAL_HAND',
  hand: {
    cardsCount,
    dealerId,
    timestamp: moment().valueOf(),
    id: v4(),
  },
});

export const closeHand = hand => ({
  type: 'CLOSE_HAND',
  hand,
});

export const placeBet = (playerId, handId, value) => ({
  type: 'PLACE_BET',
  bet: {
    playerId,
    handId,
    value,
    timestamp: moment().valueOf(),
    betId: v4(),
  },
});

export const winBet = bet => ({
  type: 'WIN_BET',
  timestamp: moment().valueOf(),
  bet,
});

export const loseBet = bet => ({
  type: 'LOSE_BET',
  timestamp: moment().valueOf(),
  bet,
});
