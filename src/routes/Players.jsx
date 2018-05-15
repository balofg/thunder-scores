import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { history as historyPropTypes } from 'history-prop-types';
import { connect } from 'react-redux';

import { startGame } from '../store/actions';

class PlayersRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      fields: ['', '', ''],
    };

    this.addField = this.addField.bind(this);
    this.removeField = this.removeField.bind(this);
    this.onFieldChange = this.onFieldChange.bind(this);
    this.submit = this.submit.bind(this);
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

  submit() {
    this.props.startGame(this.state.fields);
    this.props.history.push('/game');
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
                disabled={fields.some(field => !field) || !fields.length}
                onClick={this.submit}
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

PlayersRoute.propTypes = {
  startGame: PropTypes.func.isRequired,
  history: PropTypes.shape(historyPropTypes),
};

export default connect(null, { startGame })(PlayersRoute);
