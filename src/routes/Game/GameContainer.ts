import { connect } from "react-redux";

import {
  abortHand,
  dealHand,
  endHand,
  endRound,
  placeBet,
  startRound
} from "../../store/actions/hand";
import {
  getCurrentHand,
  getCurrentRound,
  getNextHandCardsCount,
  getNextHandDealerId
} from "../../store/selectors/hands";
import { getPlayersCumulativeScores } from "../../store/selectors/scores";
import { IStore } from "../../types/store";

import Game from "./Game";

const mapStateToProps = (state: IStore) => ({
  currentHand: getCurrentHand(state),
  currentRound: getCurrentRound(state),
  game: state.game,
  nextCardsCount: getNextHandCardsCount(state),
  nextDealerId: getNextHandDealerId(state),
  scores: getPlayersCumulativeScores(state)
});

const mapDispatchToProps = {
  abortHand,
  dealHand,
  endHand,
  endRound,
  placeBet,
  startRound,
};

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Game);
