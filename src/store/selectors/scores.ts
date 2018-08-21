import {
  BetStatus,
  IBetState,
  IPlayerState,
  IStore,
  TimedEntityStatus
} from "../../types/store";

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

export interface IHandScores {
  cardsCount: number;
  endDate: number;
  id: string;
  scores: Array<
    IPlayerScore & {
      player: IPlayerState & {
        isDealer: boolean;
      };
    }
  >;
  startDate: number;
}

export function getPlayersCumulativeScores(state: IStore): IPlayerScore[] {
  if (state.game === null) {
    return [];
  }

  return state.game.players.reduce((result, player) => {
    const playerBets = state.hands
      .filter(({ status }) => status === TimedEntityStatus.CLOSED)
      .map(
        ({ bets }) =>
          bets.find(({ playerId }) => playerId === player.id) || mockBet
      )
      .sort((a, b) => b.timestamp - a.timestamp);

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

export function getHandsScores(state: IStore) {
  if (state.game === null) {
    return [];
  }

  const closedHands = state.hands
    .filter(({ status }) => status === TimedEntityStatus.CLOSED)
    .sort((a, b) => b.startDate - a.startDate);

  return closedHands.reduce((result: IHandScores[], hand, index) => {
    const previousHand = result[index - 1];

    const playersScores: IPlayerScore[] = state.game!!.players.reduce(
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
        endDate: hand.endDate,
        id: hand.id,
        scores: playersScores,
        startDate: hand.startDate
      }
    ];
  }, []);
}
