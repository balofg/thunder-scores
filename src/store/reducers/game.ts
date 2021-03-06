import { IGameState, TimedEntityStatus } from "../../types/store";
import { GameAction } from "../actions/game";

// const mockGame: IGameState = {
//   id: "mock",
//   players: [
//     { id: "a", name: "Player 1" },
//     { id: "b", name: "Player 2" },
//     { id: "c", name: "Player 3" }
//   ],
//   startDate: Date.now(),
//   status: TimedEntityStatus.OPEN
// };

const initialState: IGameState = null;

export default function gameReducer(
  state: IGameState = initialState,
  action: GameAction
): IGameState {
  switch (action.type) {
    case "GAME_START":
      return {
        id: action.id,
        players: action.players,
        startDate: Date.now(),
        status: TimedEntityStatus.OPEN
      };
      break;
    case "GAME_END":
      if (!state) {
        return null;
      }

      return {
        ...state,
        endDate: Date.now(),
        status: TimedEntityStatus.CLOSED
      };
    default:
      return state;
  }
}
