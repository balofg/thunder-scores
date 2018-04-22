import React, { Component } from 'react';
import { connect } from 'react-redux';

import { startGame } from '../store/actions';

class NewGameRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: ['', '', ''],
    };

    this.addField = this.addField.bind(this);
    this.removeField = this.removeField.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
  }

  addField() {
    this.setState({
      fields: [...this.state.fields, ''],
    });
  }

  removeField(index) {
    this.setState({
      fields: [
        ...this.state.fields.slice(0, index),
        ...this.state.fields.slice(index + 1),
      ],
    });
  }

  onFieldChange(index, value) {
    this.setState({
      fields: [
        ...this.state.fields.slice(0, index),
        value,
        ...this.state.fields.slice(index + 1),
      ],
    });
  }

  render() {
    const { fields } = this.state;
    return (
      <div className="section">
        <div className="container">
          <h1 className="title is-size-1">
            New game
          </h1>

          <h2 className="title is-size-2 has-text-weight-normal">
            Players
          </h2>

          {fields.map((field, index) => (
            <div className="field has-addons" key={index}>
              <div className="control">
                <input
                  className="input"
                  value={field}
                  placeholder={`Player ${index + 1}`}
                  onChange={({ target: { value } }) => this.onFieldChange(index, value)}
                />
              </div>
              <div className="control">
                <button className="button" onClick={() => this.removeField(index)}>
                  <span className="icon is-small">
                    <i className="fas fa-times" />
                  </span>
                  <span>
                    Remove
                  </span>
                </button>
              </div>
            </div>
          ))}

          <div className="field is-grouped">
            <div className="control">
              <button className="button" onClick={this.addField}>
                <span className="icon is-small">
                  <i className="fas fa-plus" />
                </span>
                <span>
                  Add
                </span>
              </button>
            </div>

            <div className="control">
              <button
                className="button is-primary"
                disabled={fields.some(field => !field)}
              >
                <span className="icon is-small">
                  <i className="fas fa-bolt" />
                </span>
                <span>
                  Start game
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default connect(null, { startGame })(NewGameRoute);
