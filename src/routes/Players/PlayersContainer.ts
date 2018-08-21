import { connect } from "react-redux";

import { startGame } from "../../store/actions/game";
import Players from "./Players";

export default connect(null, { startGame })(Players);
