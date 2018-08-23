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
  player: IPlayerState;
  scores: IPlayerScore[];
  game: IGameState;
  endRound: typeof endRound;
  placeBet: typeof placeBet;
}

interface IPlayerCardState {
  betValue?: number;
  betValueError?: string;
  touched: boolean;
}

const betStatusBackgrounds = {
  [BetStatus.WON]: "success",
  [BetStatus.LOST]: "danger"
};

const betStatusIcons = {
  [BetStatus.WON]: "check",
  [BetStatus.LOST]: "times"
};

const betStatusCopy = {
  [BetStatus.WON]: "WON",
  [BetStatus.LOST]: "LOST"
};

class PlayerCard extends React.Component<IPlayerCardProps, IPlayerCardState> {
  constructor(props: IPlayerCardProps) {
    super(props);

    this.state = {
      betValue: undefined,
      touched: false
    };
  }

  public componentWillReceiveProps(nextProps: IPlayerCardProps) {
    this.validateBetValue(nextProps);
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
      : undefined;

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
                    onEnter={this.onBetValueEnter}
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
                {wins !== undefined ? wins : "--"} / {bet.value}
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
              betStatusBackgrounds[bet.status]
            }`}
          >
            <div className="card-footer-item">
              <span className="icon">
                <i className={`fas fa-${betStatusIcons[bet.status]}`} />
              </span>
              {betStatusCopy[bet.status]}
            </div>
          </div>
        ) : null}
      </div>
    );
  }

  private validateBetValue = (props: IPlayerCardProps) => {
    const { betValue: value, touched } = this.state;

    if (!touched) {
      return;
    }

    let betValueError;

    if (value === undefined) {
      betValueError = "What, is he just watching?";
    } else if (props.game && props.currentHand) {
      if (value > props.currentHand.cardsCount) {
        betValueError =
          "You're not supposed to take extra cards from the deck.";
      } else {
        const isLastBet =
          props.currentHand.bets.filter(
            ({ playerId }) => playerId !== props.player.id
          ).length ===
          props.game.players.length - 1;

        if (isLastBet) {
          const betSum = props.currentHand.bets.reduce(
            (sum, bet) => bet.value + sum,
            0
          );

          if (betSum + value === props.currentHand.cardsCount) {
            betValueError = "This way everybody wins.";
          }
        }
      }
    }

    this.setState({ betValueError });
  };

  private onBetValueChange = (value?: number) => {
    this.setState({ betValue: value, touched: true }, () =>
      this.validateBetValue(this.props)
    );
  };

  private onBetValueEnter = () => {
    if (this.state.betValue !== undefined && !this.state.betValueError) {
      this.placeBet();
    }
  }

  private placeBet = () => {
    if (this.props.currentHand) {
      this.props.placeBet(
        this.props.currentHand.id,
        this.props.player.id,
        this.state.betValue!!
      );

      this.setState({ betValue: undefined, touched: false });
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
