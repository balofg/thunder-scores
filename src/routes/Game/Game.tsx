import * as React from "react";
import { Redirect } from "react-router-dom";

import {
  abortHand,
  dealHand,
  endHand,
  endRound,
  placeBet,
  startRound
} from "../../store/actions/hand";
import { IPlayerScore } from "../../store/selectors/scores";
import { IGameState, IHandState, IRoundState } from "../../types/store";

import HandBar from "./components/HandBar";
import PlayerCard from "./components/PlayerCard";

interface IGameProps {
  game: IGameState;
  currentHand?: IHandState;
  currentRound?: IRoundState;
  nextDealerId: string;
  nextCardsCount: number;
  scores: IPlayerScore[];
  abortHand: typeof abortHand;
  dealHand: typeof dealHand;
  endHand: typeof endHand;
  startRound: typeof startRound;
  endRound: typeof endRound;
  placeBet: typeof placeBet;
}

class Game extends React.Component<IGameProps> {
  constructor(props: IGameProps) {
    super(props);
  }

  public componentWillMount() {
    this.checkRound(this.props);
  }

  public componentWillReceiveProps(nextProps: IGameProps) {
    this.checkRound(nextProps);
  }

  public render() {
    if (!this.props.game) {
      return <Redirect to="players" />;
    }

    return (
      <React.Fragment>
        <HandBar
          currentHand={this.props.currentHand}
          game={this.props.game}
          nextDealerId={this.props.nextDealerId}
          nextCardsCount={this.props.nextCardsCount}
          abortHand={this.props.abortHand}
          dealHand={this.props.dealHand}
          endHand={this.props.endHand}
        />

        {this.props.game.players.map(player => (
          <PlayerCard
            key={player.id}
            player={player}
            scores={this.props.scores}
            game={this.props.game}
            currentHand={this.props.currentHand}
            currentRound={this.props.currentRound}
            endRound={this.props.endRound}
            placeBet={this.props.placeBet}
          />
        ))}
      </React.Fragment>
    );
  }

  private checkRound(props: IGameProps) {
    if (!props.currentRound) {
      if (props.currentHand) {
        if (props.currentHand.rounds.length === props.currentHand.cardsCount) {
          this.props.startRound(props.currentHand.id);
        }
      }
    }
  }
}

export default Game;
