import * as React from "react";

interface IPlayersProps {
  startGame: (playerNames: string[]) => void;
}

interface IPlayersState {
  fields: string[];
}

class Players extends React.Component<IPlayersProps, IPlayersState> {
  constructor(props: IPlayersProps) {
    super(props);

    this.state = {
      fields: ["", "", ""]
    };
  }

  public render() {
    const { fields } = this.state;

    return (
      <div className="section">
        <div className="container">
          <h1 className="title">New game</h1>
          <h2 className="subtitle">Who's playin'?</h2>

          {fields.map((field, index) => (
            <div className="field has-addons" key={index}>
              <div className="control is-expanded">
                <input
                  className="input"
                  value={field}
                  // tslint:disable jsx-no-lambda
                  onChange={(event: React.SyntheticEvent<HTMLInputElement>) =>
                    this.onFieldChange(index, event.currentTarget.value)
                  }
                  placeholder={`Player ${index + 1}`}
                />
              </div>
              <div className="control">
                <button
                  className="button"
                  // tslint:disable jsx-no-lambda
                  onClick={() => this.removeField(index)}
                >
                  <span className="icon">
                    <i className="fas fa-times" />
                  </span>
                </button>
              </div>
            </div>
          ))}

          <div className="field is-grouped">
            <div className="control">
              <button className="button" onClick={this.addField}>
                <span className="icon">
                  <i className="fas fa-user-plus" />
                </span>
                <span>Add player</span>
              </button>
            </div>
            <div className="control">
              <button
                className="button is-primary"
                onClick={this.submit}
                disabled={
                  this.state.fields.length < 2 ||
                  this.state.fields.filter(field => !field).length > 0
                }
              >
                <span className="icon">
                  <i className="fas fa-bolt" />
                </span>
                <span>Start game</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  private addField = () => {
    this.setState({ fields: [...this.state.fields, ""] });
  }

  private removeField = (index: number) => {
    this.setState({
      fields: [
        ...this.state.fields.slice(0, index),
        ...this.state.fields.slice(index + 1)
      ]
    });
  }

  private submit = () => {
    this.props.startGame(this.state.fields);
  };

  private onFieldChange = (index: number, value: string) => {
    this.setState({
      fields: [
        ...this.state.fields.slice(0, index),
        value,
        ...this.state.fields.slice(index + 1)
      ]
    });
  }
}

export default Players;
