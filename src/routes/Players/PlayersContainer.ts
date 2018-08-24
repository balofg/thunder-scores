import { connect } from "react-redux";

import { startGameRequest as startGame } from "../../store/actions/game";
import Players from "./Players";

export default connect(null, { startGame })(Players);
