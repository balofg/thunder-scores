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

export const closeHand = async (hand) => {
  const closedHand = {
    ...hand,
    closedTimestamp: moment().valueOf(),
    status: 'CLOSED',
  };

  await saveHand(closedHand);

  return closedHand;
};
