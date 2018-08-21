import * as moment from "moment";

import { IGameState, TimedEntityStatus } from "../../types/store";
import { GameAction } from "../actions/game";

const initialState: IGameState = undefined;

export default function gameReducer(state: IGameState = initialState, action: GameAction) {
  switch (action.type) {
    case "GAME_START":
      return {
        id: action.id,
        players: action.players,
        startDate: moment().valueOf(),
      };
      break;
    case "GAME_END":
      if (!state) {
        return undefined;
      }

      return {
        ...state,
        endDate: moment().valueOf(),
        status: TimedEntityStatus.CLOSED,
      };
    default:
      return state;
  }
}