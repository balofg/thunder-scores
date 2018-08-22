import * as React from "react";
import { Redirect } from "react-router-dom";

import { abortHand, dealHand, endHand } from "../../store/actions/hand";
import { IPlayerScore } from "../../store/selectors/scores";
import { IGameState, IHandState } from "../../types/store";

import HandBar from "./components/HandBar";

interface IGameProps {
  game: IGameState;
  currentHand?: IHandState;
  nextDealerId: string;
  nextCardsCount: number;
  scores: IPlayerScore[];
  abortHand: typeof abortHand;
  dealHand: typeof dealHand;
  endHand: typeof endHand;
}

class Game extends React.Component<IGameProps> {
  constructor(props: IGameProps) {
    super(props);
  }

  public render() {
    if (!this.props.game) {
      return <Redirect to="players" />
    }

    return (
      <React.Fragment>
        <HandBar
          currentHand={this.props.currentHand}
          nextDealerId={this.props.nextDealerId}
          nextCardsCount={this.props.nextCardsCount}
          abortHand={this.props.abortHand}
          dealHand={this.props.dealHand}
          endHand={this.props.endHand}
        />
      </React.Fragment>
    );
  }
}

export default Game;
