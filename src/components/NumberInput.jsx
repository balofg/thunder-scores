import React, { Component } from 'react';
import PropTypes from 'prop-types';

class NumberInput extends Component {
  constructor(props) {
    super(props);
    this.state = { value: props.value };
    this.onChange = this.onChange.bind(this);
    this.onKeyPress = this.onKeyPress.bind(this);
  }

  componentWillReceiveProps({ value }) {
    this.setState({ value });
  }

  onChange({ target: { value } }) {
    const { onChange } = this.props;

    if (/^\d*$/ig.test(value)) {
      onChange(value === '' ? undefined : parseFloat(value));
    }
  }

  onKeyPress({ key }) {
    if (key === 'Enter') {
      if (typeof this.props.onEnter === 'function') {
        this.props.onEnter();
      }
    }
  }

  render() {
    const { value } = this.state;
    const { placeholder, isDanger } = this.props;

    return (
      <input
        className={`input ${isDanger ? 'is-danger' : ''}`}
        type="tel"
        placeholder={placeholder}
        value={value}
        onChange={this.onChange}
        onKeyPress={this.onKeyPress}
      />
    );
  }
}

NumberInput.propTypes = {
  onChange: PropTypes.func.isRequired,
  onEnter: PropTypes.func,
  value: PropTypes.oneOfType([PropTypes.number, PropTypes.string]),
  placeholder: PropTypes.string,
  isDanger: PropTypes.bool,
};

NumberInput.defaultProps = {
  onEnter: undefined,
  value: '',
  placeholder: undefined,
  isDanger: false,
};

export default NumberInput;
