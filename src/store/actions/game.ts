import * as uniqid from "uniqid";
import { IPlayerState } from "../../types/store";

export interface IGameStartAction {
  id: string;
  players: IPlayerState[];
  type: "GAME_START";
}

export function startGame(playerNames: string[]): IGameStartAction {
  return {
    id: uniqid(),
    players: playerNames.map(name => ({
      id: uniqid(),
      name,
    })),
    type: "GAME_START"
  };
}

export interface IGameEndAction {
  type: "GAME_END";
}

export function endGame(): IGameEndAction {
  return {
    type: "GAME_END"
  };
}

export type GameAction = IGameStartAction | IGameEndAction;
