import { connect } from "react-redux";

import { endGame } from "../../store/actions/game";
import { getHandsScores } from "../../store/selectors/scores";
import { IStore } from "../../types/store";
import Scoreboard from "./Scoreboard";

const mapStateToProps = (state: IStore) => ({
  game: state.game,
  handsScores: getHandsScores(state)
});

const mapDispatchToProps = { endGame };

export default connect(mapStateToProps, mapDispatchToProps)(Scoreboard);
