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
import {
  IGameState,
  IHandState,
  IRoundState,
  TimedEntityStatus
} from "../../types/store";

import HandBar from "./components/HandBar";
import PlayerCard from "./components/PlayerCard";

interface IGameComponentProps {
  game: IGameState;
  currentHand?: IHandState;
  currentRound?: IRoundState;
  isDonePlaying: boolean;
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

interface IGameComponentState {
  playersOrder: number[];
}

class Game extends React.Component<IGameComponentProps, IGameComponentState> {
  constructor(props: IGameComponentProps) {
    super(props);

    this.state = {
      playersOrder: props.game
        ? props.game.players.map((player, index) => index)
        : []
    };
  }

  public componentWillMount() {
    this.checkRound(this.props);
  }

  public componentWillReceiveProps(nextProps: IGameComponentProps) {
    this.checkRound(nextProps);
  }

  public render() {
    if (!this.props.game) {
      return <Redirect to="players" />;
    }

    if (this.props.game.status === TimedEntityStatus.CLOSED) {
      return <Redirect to="scoreboard" />;
    }

    return (
      <div className="section">
        <div className="container">
          <HandBar
            currentHand={this.props.currentHand}
            game={this.props.game}
            isDonePlaying={this.props.isDonePlaying}
            nextDealerId={this.props.nextDealerId}
            nextCardsCount={this.props.nextCardsCount}
            abortHand={this.props.abortHand}
            dealHand={this.props.dealHand}
            endHand={this.props.endHand}
          />

          <div className="content">
            <div className="columns is-multiline is-centered">
              {this.state.playersOrder.map(index => {
                const player = this.props.game!!.players[index];
                return (
                  <div className="column is-one-third" key={player.id}>
                    <PlayerCard
                      player={player}
                      scores={this.props.scores}
                      game={this.props.game}
                      currentHand={this.props.currentHand}
                      currentRound={this.props.currentRound}
                      endRound={this.props.endRound}
                      placeBet={this.props.placeBet}
                    />
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    );
  }

  private checkRound(props: IGameComponentProps) {
    if (props.currentHand) {
      if (!props.currentRound) {
        if (!props.isDonePlaying) {
          this.props.startRound(props.currentHand.id);
        }
      }

      if (props.game) {
        const currentDealerIndex = props.game.players.findIndex(
          ({ id }) => id === props.currentHand!!.dealerId
        );

        if (currentDealerIndex > -1) {
          const playersOrder = props.game.players.map(
            (player, index) =>
              (index + 1 + currentDealerIndex) % props.game!!.players.length
          );

          this.setState({ playersOrder });
        }
      }
    }
  }
}

export default Game;
