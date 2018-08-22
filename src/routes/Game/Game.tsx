import { History } from "history";
import * as React from "react";

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
  history: History;
  abortHand: typeof abortHand;
  dealHand: typeof dealHand;
  endHand: typeof endHand;
}

class Game extends React.Component<IGameProps> {
  constructor(props: IGameProps) {
    super(props);

    if (props.game === null) {
      props.history.push("/players");
    }
  }

  public render() {
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
