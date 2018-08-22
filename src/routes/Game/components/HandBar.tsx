import * as React from "react";

import { abortHand, dealHand, endHand } from "../../../store/actions/hand";
import { IGameState, IHandState } from "../../../types/store";

interface IHandBarProps {
  currentHand?: IHandState;
  game: IGameState;
  nextDealerId: string;
  nextCardsCount: number;
  abortHand: typeof abortHand;
  dealHand: typeof dealHand;
  endHand: typeof endHand;
}

interface IHandBarState {
  cardsCount: number;
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

  public render() {
    const { currentHand, game } = this.props;

    if (!game) {
      return null;
    }

    return (
      <div className="section">
        <div className="container">
          {currentHand ? (
            <React.Fragment>
              <h1 className="title">
                {currentHand.cardsCount} card
                {currentHand.cardsCount > 1 ? "s" : ""} hand
              </h1>
              <div className="field is-grouped">
                <div className="control">
                  <button className="button">
                    <span className="icon">
                      <i className="fas fa-undo" />
                    </span>
                    <span>Undo hand</span>
                  </button>
                </div>
                <div className="control">
                  <button className="button is-primary">
                    <span className="icon">
                      <i className="fas fa-check" />
                    </span>
                    <span>Close hand</span>
                  </button>
                </div>
              </div>
            </React.Fragment>
          ) : (
            <React.Fragment>
              <h1 className="title">New hand</h1>
              <div className="field">
                <label className="label">How many cards?</label>
                <div className="control">
                  <input
                    type="text"
                    className="input"
                    value={this.props.nextCardsCount}
                  />
                </div>
              </div>
              <div className="field">
                <label className="label">Who's dealing?</label>
                <div className="control is-expanded">
                  <div className="select" style={{ width: "100%" }}>
                    <select
                      value={this.state.dealerId}
                      style={{ width: "100%" }}
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
                  <button className="button is-primary">
                    <span className="icon">
                      <i className="fas fa-bolt" />
                    </span>
                    <span>Deal hand</span>
                  </button>
                </div>
              </div>
            </React.Fragment>
          )}
        </div>
      </div>
    );
  }
}

export default HandBar;
