import * as uniqid from "uniqid";
import { IPlayerState } from "../../types/store";

export interface IGameStartAction {
  id: string;
  players: IPlayerState[];
  type: "GAME_START";
}

export function startGame(players: IPlayerState[]): IGameStartAction {
  return {
    id: uniqid(),
    players,
    type: "GAME_START"
  };
}

export interface IGameEndAction {
  gameId: string;
  type: "GAME_END";
}

export function endGame(gameId: string): IGameEndAction {
  return {
    gameId,
    type: "GAME_END"
  };
}
