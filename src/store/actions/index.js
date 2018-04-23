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
  timestamp: moment().valueOf(),
  bet: {
    playerId,
    handId,
    value,
    betId: v4(),
  },
});

export const closeBet = bet => ({
  type: 'CLOSE_BET',
  timestamp: moment().valueOf(),
  bet,
});
