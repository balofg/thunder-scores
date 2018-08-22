import { IRoundState, IStore, TimedEntityStatus } from "../../types/store";

export function getClosedHands(state: IStore) {
  return state.hands
    .filter(({ status }) => status === TimedEntityStatus.CLOSED)
    .sort((a, b) => a.startDate - b.startDate);
}

export function getCurrentHand(state: IStore) {
  return state.hands.find(({ status }) => status === TimedEntityStatus.OPEN);
}

export function getCurrentRound(state: IStore): IRoundState | undefined {
  const currentHand = getCurrentHand(state);
  if (currentHand) {
    return currentHand.rounds.find(
      ({ status }) => status === TimedEntityStatus.OPEN
    );
  }

  return undefined;
}

export function isDonePlaying(state: IStore): boolean {
  const currentHand = getCurrentHand(state);
  if (currentHand) {
    const finishedRounds = currentHand.rounds.filter(
      ({ status }) => status === TimedEntityStatus.CLOSED
    ).length;

    return finishedRounds === currentHand.cardsCount;
  }

  return false;
}

export function getNextHandDealerId(state: IStore) {
  if (state.game === null) {
    return "";
  }

  const closedHands = getClosedHands(state);
  const previousHand = closedHands[closedHands.length - 1];

  if (previousHand) {
    const previousPlayerIndex = state.game.players.findIndex(
      ({ id }) => id === previousHand.dealerId
    );
    if (previousPlayerIndex > -1) {
      return state.game.players[
        (previousPlayerIndex + 1) % state.game.players.length
      ].id;
    }
  }

  return state.game.players[0].id;
}

export function getNextHandCardsCount(state: IStore) {
  const closedHands = getClosedHands(state);
  const previousHand = closedHands[closedHands.length - 1];

  return previousHand ? previousHand.cardsCount : 1;
}
