import React, { Component } from 'react';
import historyPropType from 'history-prop-types';
import { match } from 'react-router-prop-types';

import BetController from '../components/BetController';

class GameRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {};
  }
}

GameRoute.propTypes = {
  history: historyPropType,
  match: match.isRequired,
};

export default GameRoute;
