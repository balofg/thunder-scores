import * as React from "react";

import { abortHand, dealHand, endHand } from "../../../store/actions/hand";
import { IHandState } from "../../../types/store";

interface IHandBarProps {
  currentHand?: IHandState;
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
    const { currentHand } = this.props;

    return (
      <div className="section">
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
        ) : null}
      </div>
    );
  }
}

export default HandBar;
