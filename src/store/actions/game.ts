import { IGameDbRow, IPlayerDbRow } from "../../types/db";

export interface IGameStartRequestAction {
  playerNames: string[];
  type: "GAME_START_REQUEST";
}

export function startGameRequest(
  playerNames: string[]
): IGameStartRequestAction {
  return {
    playerNames,
    type: "GAME_START_REQUEST"
  };
}

export interface IGameStartSuccessAction {
  game: IGameDbRow;
  players: IPlayerDbRow[];
  type: "GAME_START_SUCCESS";
}

export function startGameSuccess(
  game: IGameDbRow,
  players: IPlayerDbRow[]
): IGameStartSuccessAction {
  return {
    game,
    players,
    type: "GAME_START_SUCCESS"
  };
}

export interface IGameStartFailureAction {
  error: Error;
  type: "GAME_START_FAILURE";
}

export function startGameFailure(error: Error): IGameStartFailureAction {
  return {
    error,
    type: "GAME_START_FAILURE"
  };
}

export type GameStartAction =
  | IGameStartRequestAction
  | IGameStartSuccessAction
  | IGameStartFailureAction;

export interface IGameEndRequestAction {
  gameId: string;
  type: "GAME_END_REQUEST";
}

export function endGameRequest(gameId: string): IGameEndRequestAction {
  return {
    gameId,
    type: "GAME_END_REQUEST"
  };
}

export interface IGameEndSuccessAction {
  endDate: number;
  type: "GAME_END_SUCCESS";
}

export function endGameSuccess(endDate: number): IGameEndSuccessAction {
  return {
    endDate,
    type: "GAME_END_SUCCESS"
  };
}

export interface IGameEndFailureAction {
  error: Error;
  type: "GAME_END_FAILURE";
}

export function endGameFailure(error: Error): IGameEndFailureAction {
  return {
    error,
    type: "GAME_END_FAILURE"
  };
}

export type GameEndAction =
  | IGameEndRequestAction
  | IGameEndSuccessAction
  | IGameEndFailureAction;

export type GameAction = GameStartAction | GameEndAction;
