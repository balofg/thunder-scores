import moment from 'moment';
import uniqid from 'uniqid';

import { getHandsByGame, saveHand } from './db';

export { getHandsByGame };

export const dealHand = async (cardsCount, dealerId) => {
  const hand = {
    id: uniqid(),
    dealtTimestamp: moment().valueOf(),
    status: 'OPEN',
    cardsCount,
    dealerId,
  };

  await saveHand(hand);

  return hand;
};

export const closeHand = async (hand, status = 'CLOSED') => {
  const closedHand = {
    ...hand,
    status,
    closedTimestamp: moment().valueOf(),
  };

  await saveHand(closedHand);

  return closedHand;
};
