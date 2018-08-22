import { connect } from "react-redux";

import { abortHand, dealHand, endHand } from "../../store/actions/hand";
import {
  getCurrentHand,
  getNextHandCardsCount,
  getNextHandDealerId
} from "../../store/selectors/hands";
import { getPlayersCumulativeScores } from "../../store/selectors/scores";
import { IStore } from "../../types/store";

import Game from "./Game";

const mapStateToProps = (state: IStore) => ({
  currentHand: getCurrentHand(state),
  game: state.game,
  nextCardsCount: getNextHandCardsCount(state),
  nextDealerId: getNextHandDealerId(state),
  scores: getPlayersCumulativeScores(state)
});

const mapDispatchToProps = {
  abortHand,
  dealHand,
  endHand
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
