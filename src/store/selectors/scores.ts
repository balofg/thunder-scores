import {
  BetStatus,
  IBetState,
  IPlayerState,
  IStore,
} from "../../types/store";

import { getClosedHands } from "./hands";

const mockBet: IBetState = {
  id: "",
  playerId: "",
  status: BetStatus.LOST,
  timestamp: 0,
  value: 0
};

export interface IPlayerScore {
  player: IPlayerState;
  score: number;
}

export type IHandPlayerScore = IPlayerScore & {
  player: IPlayerState & {
    isDealer: boolean;
  };
  bet: IBetState;
}

export interface IHandScores {
  cardsCount: number;
  endDate: number;
  id: string;
  scores: IHandPlayerScore[];
  startDate: number;
}

export function getPlayersCumulativeScores(state: IStore): IPlayerScore[] {
  if (state.game.data === undefined) {
    return [];
  }

  return state.game.data.players.reduce((result, player) => {
    const closedHands = getClosedHands(state);

    const playerBets = closedHands.map(
      ({ bets }) =>
        bets.find(({ playerId }) => playerId === player.id) || mockBet
    );

    const score = playerBets.reduce(
      (total, bet) =>
        bet.status === BetStatus.WON
          ? total + 10 + bet.value
          : total - bet.value,
      0
    );

    return [
      ...result,
      {
        player,
        score
      }
    ];
  }, []);
}

export function getHandsScores(state: IStore): IHandScores[] {
  if (state.game.data === undefined) {
    return [];
  }

  const closedHands = getClosedHands(state);

  return closedHands.reduce((result: IHandScores[], hand, index) => {
    const previousHand = result[index - 1];

    const playersScores: IHandPlayerScore[] = state.game.data!!.players.reduce(
      (scores, player) => {
        const playerBet =
          hand.bets.find(({ playerId }) => playerId === player.id) || mockBet;

        const previousPlayerScore = previousHand
          ? previousHand.scores.find(({ player: { id } }) => id === player.id)!!
              .score
          : 0;

        return [
          ...scores,
          {
            bet: playerBet,
            player: {
              ...player,
              isDealer: hand.dealerId === player.id
            },
            score:
              playerBet.status === BetStatus.WON
                ? previousPlayerScore + 10 + playerBet.value
                : previousPlayerScore - playerBet.value
          }
        ];
      },
      []
    );

    return [
      ...result,
      {
        cardsCount: hand.cardsCount,
        endDate: hand.endDate!!,
        id: hand.id,
        scores: playersScores,
        startDate: hand.startDate
      }
    ];
  }, []);
}
