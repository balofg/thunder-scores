import moment from 'moment';
import uniqid from 'uniqid';

import { getBetsByGame, getBetsByHand, saveBet } from './db';

export {
  getBetsByGame,
  getBetsByHand,
};

export const placeBet = async (playerId, value) => {
  const bet = {
    id: uniqid(),
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
