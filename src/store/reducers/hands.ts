import * as moment from "moment";

import { IHandState, TimedEntityStatus } from "../../types/store";
import { HandAction } from "../actions/hand";

const initialState: IHandState[] = [];

const replaceHandAtIndex = (
  state: IHandState[],
  index: number,
  newHand: IHandState
): IHandState[] => [
  ...state.slice(0, index),
  newHand,
  ...state.slice(index + 1)
];

export default function handsReducer(
  state: IHandState[] = initialState,
  action: HandAction
): IHandState[] {
  switch (action.type) {
    case "HAND_DEAL":
      return [
        ...state,
        {
          bets: [],
          cardsCount: action.cardsCount,
          dealerId: action.dealerId,
          gameId: action.gameId,
          id: action.id,
          rounds: [],
          startDate: moment().valueOf(),
          status: TimedEntityStatus.OPEN
        }
      ];
    case "HAND_ABORT": {
      const handIndex = state.findIndex(({ id }) => id === action.handId);
      if (handIndex > -1) {
        return replaceHandAtIndex(state, handIndex, {
          ...state[handIndex],
          endDate: moment().valueOf(),
          status: TimedEntityStatus.ABORTED
        });
      }

      return state;
    }
    case "HAND_BET_PLACE": {
      const handIndex = state.findIndex(({ id }) => id === action.handId);
      if (handIndex > -1) {
        return replaceHandAtIndex(state, handIndex, {
          ...state[handIndex],
          bets: [
            ...state[handIndex].bets,
            {
              id: action.id,
              playerId: action.playerId,
              value: action.value
            }
          ]
        });
      }

      return state;
    }
    case "HAND_ROUND_START": {
      const handIndex = state.findIndex(({ id }) => id === action.handId);
      if (handIndex > -1) {
        return replaceHandAtIndex(state, handIndex, {
          ...state[handIndex],
          rounds: [
            ...state[handIndex].rounds,
            {
              id: action.id,
              startDate: moment().valueOf(),
              status: TimedEntityStatus.OPEN
            }
          ]
        });
      }

      return state;
    }
    case "HAND_ROUND_END": {
      const handIndex = state.findIndex(({ id }) => id === action.handId);
      if (handIndex > -1) {
        const hand = state[handIndex];
        const roundIndex = state[handIndex].rounds.findIndex(
          ({ id }) => id === action.roundId
        );
        if (roundIndex > -1) {
          const round = hand.rounds[roundIndex];

          const handStatus = hand.rounds.length === hand.cardsCount ? {
            endDate: moment().valueOf(),
            status: TimedEntityStatus.CLOSED,
          } : {};

          return replaceHandAtIndex(state, handIndex, {
            ...hand,
            ...handStatus,
            rounds: [
              ...hand.rounds.slice(0, roundIndex),
              {
                ...round,
                endDate: moment().valueOf(),
                status: TimedEntityStatus.CLOSED,
                winnerId: action.winnerId
              },
              ...hand.rounds.slice(roundIndex + 1)
            ]
          });
        }
      }
    }
    default:
      return state;
  }
}
