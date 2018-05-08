import moment from 'moment';
import { v4 } from 'uuid';

import { getBetsByGame, getBetsByHand, saveBet } from './db';

export {
  getBetsByGame,
  getBetsByHand,
};

export const placeBet = async (playerId, value) => {
  const bet = {
    id: v4(),
    placedTimestamp: moment().valueOf(),
    status: 'OPEN',
    value,
    playerId,
  };

  await saveBet(bet);

  return bet;
};

export const closeBet = async (bet, result) => {
  const closedBet = {
    ...bet,
    closedTimestamp: moment().valueOf(),
    status: 'CLOSED',
    result,
  };

  await saveBet(closedBet);

  return closedBet;
};
