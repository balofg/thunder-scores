import * as React from "react";

import NumberInput from "../../../components/NumberInput";
import { endRound, placeBet } from "../../../store/actions/hand";
import { IPlayerScore } from "../../../store/selectors/scores";
import {
  BetStatus,
  IGameState,
  IHandState,
  IPlayerState,
  IRoundState
} from "../../../types/store";

interface IPlayerCardProps {
  currentHand?: IHandState;
  currentRound?: IRoundState;
  isDonePlaying: boolean;
  player: IPlayerState;
  scores: IPlayerScore[];
  game: IGameState;
  endRound: typeof endRound;
  placeBet: typeof placeBet;
}

interface IPlayerCardState {
  betValue?: number;
  betValueError?: string;
}

class PlayerCard extends React.Component<IPlayerCardProps, IPlayerCardState> {
  constructor(props: IPlayerCardProps) {
    super(props);

    this.state = {
      betValue: undefined
    };
  }

  public render() {
    const { game, player, currentHand } = this.props;

    const score = this.props.scores.find(
      ({ player: { id } }) => id === player.id
    );

    if (!score || !game) {
      return null;
    }

    const bet = currentHand
      ? currentHand.bets.find(({ playerId }) => playerId === player.id)
      : undefined;

    const wins = currentHand
      ? currentHand.rounds.filter(({ winnerId }) => winnerId === player.id)
          .length
      : 0;

    const canPlay = currentHand
      ? currentHand.bets.length === game.players.length
      : false;

    return (
      <div className="card">
        <div className="card-content">
          <div className="content">
            <div className="title is-size-4">{player.name}</div>
            <div className="subtitle is-size-6">
              {score.score} point
              {score.score === 1 ? "" : "s"}
            </div>

            {currentHand && !bet ? (
              <div className="field has-addons">
                <div className="control is-expanded">
                  <NumberInput
                    onChange={this.onBetValueChange}
                    placeholder="Bet value"
                    isDanger={!!this.state.betValueError}
                    value={this.state.betValue}
                  />
                </div>
                <div className="control">
                  <button
                    className="button"
                    disabled={
                      !!this.state.betValueError ||
                      this.state.betValue === undefined
                    }
                    onClick={this.placeBet}
                  >
                    <span className="icon">
                      <i className="fas fa-arrow-right" />
                    </span>
                    <span>Place bet</span>
                  </button>
                </div>
              </div>
            ) : null}

            {bet ? (
              <p className="is-size-2 has-text-centered">
                {canPlay || this.props.isDonePlaying ? wins : "--"} /{" "}
                {bet.value}
              </p>
            ) : null}

            {this.state.betValueError ? (
              <p className="help is-danger">{this.state.betValueError}</p>
            ) : null}
          </div>
        </div>

        {canPlay && bet && bet.status === BetStatus.OPEN ? (
          <div className="card-footer">
            <a className="card-footer-item" onClick={this.winRound}>
              <span className="icon">
                <i className="fas fa-hand-paper" />
              </span>
              <span>Take</span>
            </a>
          </div>
        ) : null}

        {bet && bet.status !== BetStatus.OPEN ? (
          <div
            className={`card-footer has-text-white has-background-${
              bet.status === BetStatus.WON ? "success" : "danger"
            }`}
          >
            <div className="card-footer-item">
              {bet.status === BetStatus.WON ? "WON" : "LOST"}
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  private onBetValueChange = (value?: number) => {
    let betValueError;

    if (value === undefined) {
      betValueError = "What, is he just watching?";
    } else if (this.props.game && this.props.currentHand) {
      if (value > this.props.currentHand.cardsCount) {
        betValueError =
          "You're not supposed to take extra cards from the deck.";
      } else {
        const isLastBet =
          this.props.currentHand.bets.length ===
          this.props.game.players.length - 1;

        if (isLastBet) {
          const betSum = this.props.currentHand.bets.reduce(
            (sum, bet) => bet.value + sum,
            0
          );

          if (betSum + value === this.props.currentHand.cardsCount) {
            betValueError = "This way everybody wins.";
          }
        }
      }
    }

    this.setState({ betValue: value, betValueError });
  };

  private placeBet = () => {
    if (this.props.currentHand) {
      this.props.placeBet(
        this.props.currentHand.id,
        this.props.player.id,
        this.state.betValue!!
      );
    }
  };

  private winRound = () => {
    if (this.props.currentHand && this.props.currentRound) {
      this.props.endRound(
        this.props.currentHand.id,
        this.props.currentRound.id,
        this.props.player.id
      );
    }
  };
}

export default PlayerCard;
