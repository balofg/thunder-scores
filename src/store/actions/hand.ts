import * as uniqid from "uniqid";

export interface IHandDealAction {
  cardsCount: number;
  dealerId: string;
  id: string;
  gameId: string;
  type: "HAND_DEAL";
}

export function dealHand(gameId: string, cardsCount: number, dealerId: string): IHandDealAction {
  return {
    cardsCount,
    dealerId,
    gameId,
    id: uniqid(),
    type: "HAND_DEAL"
  };
}


export interface IHandAbortAction {
  handId: string;
  type: "HAND_ABORT";
}

export function abortHand(handId: string) {
  return {
    handId,
    type: "HAND_ABORT"
  };
}

export interface IHandEndAction {
  handId: string;
  type: "HAND_END";
}

export function endHand(handId: string): IHandEndAction {
  return {
    handId,
    type: "HAND_END"
  };
}

export interface IBetPlaceAction {
  handId: string;
  id: string;
  playerId: string;
  type: "HAND_BET_PLACE";
  value: number;
}

export function placeBet(
  handId: string,
  playerId: string,
  value: number
): IBetPlaceAction {
  return {
    handId,
    id: uniqid(),
    playerId,
    type: "HAND_BET_PLACE",
    value
  };
}

export interface IRoundStartAction {
  handId: string;
  id: string;
  type: "HAND_ROUND_START";
}

export function startRound(handId: string): IRoundStartAction {
  return {
    handId,
    id: uniqid(),
    type: "HAND_ROUND_START"
  };
}

export interface IRoundEndAction {
  handId: string;
  roundId: string;
  type: "HAND_ROUND_END";
  winnerId: string;
}

export function endRound(handId: string, roundId: string, winnerId: string): IRoundEndAction {
  return {
    handId,
    roundId,
    type: "HAND_ROUND_END",
    winnerId
  };
}

export type HandAction =
  | IHandDealAction
  | IHandEndAction
  | IHandAbortAction
  | IBetPlaceAction
  | IRoundStartAction
  | IRoundEndAction;
