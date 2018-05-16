import moment from 'moment';
import uniqid from 'uniqid';

export const startGame = playerNames => ({
  type: 'START_GAME',
  gameId: uniqid(),
  players: playerNames.map(name => ({
    name,
    id: uniqid(),
    scores: [{ score: 0 }],
  })),
});

export const dealHand = (dealerId, cardsCount) => ({
  type: 'DEAL_HAND',
  timestamp: moment().valueOf(),
  hand: {
    cardsCount,
    dealerId,
    id: uniqid(),
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
    id: uniqid(),
  },
});

export const closeBet = (bet, result) => ({
  type: 'CLOSE_BET',
  timestamp: moment().valueOf(),
  bet,
  result,
});
