import {
  IGameState,
  ILoadableResource,
  TimedEntityStatus
} from "../../types/store";
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

const initialState: ILoadableResource<IGameState> = {
  loading: false
};

export default function gameReducer(
  state: ILoadableResource<IGameState> = initialState,
  action: GameAction
): ILoadableResource<IGameState> {
  switch (action.type) {
    case "GAME_START_REQUEST":
      return {
        loading: true
      };
    case "GAME_START_SUCCESS":
      return {
        data: {
          ...action.game,
          players: action.players
        },
        loading: false
      };
      break;
    case "GAME_START_FAILURE":
      return {
        error: action.error,
        loading: false
      };
    case "GAME_END_REQUEST":
      return {
        data: state.data,
        loading: true
      };
    case "GAME_END_SUCCESS":
      if (state.data) {
        return {
          data: {
            ...state.data,
            endDate: action.endDate,
            status: TimedEntityStatus.CLOSED
          },
          loading: false
        };
      }

      return { loading: false };
    case "GAME_END_FAILURE":
      return {
        data: state.data,
        error: action.error,
        loading: false,
      };
    default:
      return state;
  }
}
