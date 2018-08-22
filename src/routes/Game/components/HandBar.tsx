import * as React from "react";

import NumberInput from "../../../components/NumberInput";
import { abortHand, dealHand, endHand } from "../../../store/actions/hand";
import { IGameState, IHandState } from "../../../types/store";

interface IHandBarProps {
  currentHand?: IHandState;
  game: IGameState;
  isDonePlaying: boolean;
  nextDealerId: string;
  nextCardsCount: number;
  abortHand: typeof abortHand;
  dealHand: typeof dealHand;
  endHand: typeof endHand;
}

interface IHandBarState {
  cardsCount?: number;
  cardsCountError?: string;
  dealerId: string;
}

class HandBar extends React.Component<IHandBarProps, IHandBarState> {
  constructor(props: IHandBarProps) {
    super(props);

    this.state = {
      cardsCount: props.nextCardsCount,
      dealerId: props.nextDealerId
    };
  }

  public componentWillReceiveProps({
    nextCardsCount,
    nextDealerId
  }: IHandBarProps) {
    this.setState({ cardsCount: nextCardsCount, dealerId: nextDealerId });
  }

  public render() {
    const { currentHand, game } = this.props;

    if (!game) {
      return null;
    }

    if (currentHand) {
      const dealer = game.players.find(({ id }) => id === currentHand.dealerId);
      const delta =
        currentHand.bets.reduce((sum, { value }) => sum + value, 0) -
        currentHand.cardsCount;

      return (
        <div className="section">
          <div className="container">
            {!!dealer && (
              <h2 className="subtitle">
                {dealer.name}
                's hand
              </h2>
            )}
            <h1 className="title">
              {currentHand.cardsCount} card
              {currentHand.cardsCount > 1 ? "s" : ""}; &Delta;{" "}
              {delta > 0 ? "+" : ""}
              {delta}
            </h1>
            <div className="field is-grouped">
              <div className="control">
                <button className="button" onClick={this.abortHand}>
                  <span className="icon">
                    <i className="fas fa-undo" />
                  </span>
                  <span>Undo hand</span>
                </button>
              </div>
              <div className="control">
                <button
                  className="button is-primary"
                  disabled={!this.props.isDonePlaying}
                  onClick={this.endHand}
                >
                  <span className="icon">
                    <i className="fas fa-check" />
                  </span>
                  <span>Close hand</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="section">
        <div className="container">
          <h1 className="title">New hand</h1>
          <div className="field">
            <label className="label">How many cards?</label>
            <div className="control">
              <NumberInput
                onChange={this.onCardsCountChange}
                isDanger={!!this.state.cardsCountError}
                value={this.state.cardsCount}
              />
            </div>
            {!!this.state.cardsCountError && (
              <p className="help is-danger">{this.state.cardsCountError}</p>
            )}
          </div>
          <div className="field">
            <label className="label">Who's dealing?</label>
            <div className="control is-expanded">
              <div className="select" style={{ width: "100%" }}>
                <select
                  value={this.state.dealerId}
                  style={{ width: "100%" }}
                  onChange={this.onDealerChange}
                >
                  {game.players.map(player => (
                    <option key={player.id} value={player.id}>
                      {player.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div className="field">
            <div className="control">
              <button
                className="button is-primary"
                disabled={!!this.state.cardsCountError}
                onClick={this.dealHand}
              >
                <span className="icon">
                  <i className="fas fa-bolt" />
                </span>
                <span>Deal hand</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private dealHand = () => {
    // validation of `cardsCount` is done elsewhere
    // if this gets called when the value is undefined
    // it is ok for this bit to explode uncontrollably
    this.props.dealHand(this.state.cardsCount!!, this.state.dealerId);
  };

  private endHand = () => {
    if (this.props.currentHand) {
      this.props.endHand(this.props.currentHand.id);
    }
  };

  private abortHand = () => {
    if (this.props.currentHand) {
      this.props.abortHand(this.props.currentHand.id);
    }
  };

  private onDealerChange = (event: React.SyntheticEvent<HTMLSelectElement>) => {
    this.setState({ dealerId: event.currentTarget.value });
  };

  private onCardsCountChange = (value?: number) => {
    let cardsCountError;

    if (!this.props.game) {
      return;
    }

    if (value === undefined || value === 0) {
      cardsCountError = "You can't play with no cards, can you?";
    } else if (value < 0 || value > 52) {
      cardsCountError = "What kind of deck are you trying to use?!";
    } else if (value * this.props.game.players.length > 52) {
      cardsCountError = "Everyone should get at least one card.";
    }

    this.setState({ cardsCount: value, cardsCountError });
  };
}

export default HandBar;
