import * as moment from "moment";
import * as uniqid from "uniqid";
import { IPlayerState } from "../../types/store";

export interface IGameStartAction {
  id: string;
  players: IPlayerState[];
  startDate: number;
  type: "GAME_START";
}

export function startGame(players: IPlayerState[]): IGameStartAction {
  return {
    id: uniqid(),
    players,
    startDate: moment().valueOf(),
    type: "GAME_START"
  };
}

export interface IGameEndAction {
  endDate: number;
  gameId: string;
  type: "GAME_END";
}

export function endGame(gameId: string): IGameEndAction {
  return {
    endDate: moment().valueOf(),
    gameId,
    type: "GAME_END"
  };
}
