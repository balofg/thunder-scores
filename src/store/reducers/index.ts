import { combineReducers } from "redux";

import game from "./game";
import hands from "./hands";

export default combineReducers({
  game,
  hands
});
