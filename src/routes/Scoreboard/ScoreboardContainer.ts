import { connect } from "react-redux";

import { getHandsScores } from "../../store/selectors/scores";
import { IStore } from "../../types/store";
import Scoreboard from "./Scoreboard";

const mapStateToProps = (state: IStore) => ({
  scores: getHandsScores(state)
});

export default connect(mapStateToProps)(Scoreboard);
