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
  timestamp: moment().valueOf(),
  hand: {
    cardsCount,
    dealerId,
    id: v4(),
  },
});

export const closeHand = hand => ({
  type: 'CLOSE_HAND',
  hand,
});

export const abortHand = hand => ({
  type: 'ABORT_HAND',
  timestamp: moment().valueOf(),
  hand,
});

export const placeBet = (playerId, handId, value) => ({
  type: 'PLACE_BET',
  timestamp: moment().valueOf(),
  bet: {
    playerId,
    handId,
    value,
    id: v4(),
  },
});

export const closeBet = (bet, result) => ({
  type: 'CLOSE_BET',
  timestamp: moment().valueOf(),
  bet,
  result,
});
