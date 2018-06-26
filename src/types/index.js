import PropTypes from 'prop-types';

export const statusType = PropTypes.oneOf(['OPEN', 'CLOSED', 'ABORTED']);

export const playerPropTypes = {
  id: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
};

export const betPropTypes = {
  id: PropTypes.string.isRequired,
  playerId: PropTypes.string.isRequired,
  status: statusType.isRequired,
  value: PropTypes.number.isRequired,
  result: PropTypes.number,
};

export const betDefaultProps = {
  result: undefined,
};

export const gamePropTypes = {
  id: PropTypes.string.isRequired,
  status: statusType.isRequired,
  startedTimestamp: PropTypes.number.isRequired,
  endedTimestamp: PropTypes.number,
};

export const gameDefaultProps = {
  endedTimestamp: undefined,
};

export const handPropTypes = {
  id: PropTypes.string.isRequired,
  dealerId: PropTypes.string.isRequired,
  cardsCount: PropTypes.number.isRequired,
  status: statusType.isRequried,
  dealtTimestamp: PropTypes.number.isRequired,
  closedTimestamp: PropTypes.number,
};

export const handDefaultProps = {
  closedTimestamp: undefined,
};
