const initialState = {
  players: [],
  bets: [],
  hands: [],
};

const reducer = (state = initialState, action) => {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...initialState,
        players: action.players,
      };
    case 'DEAL_HAND':
      return {
        ...state,
        hands: [
          ...state.hands,
          action.hand,
        ],
      };
    case 'PLACE_BET':
      return {
        ...state,
        bets: [
          ...state.bets,
          action.bet,
        ],
      };
    case 'WIN_BET':
    case 'LOSE_BET': {
      const betIndex = state.bets.findIndex(({ id }) => id === action.bet.id);
      const playerIndex = state.players.findIndex(({ id }) => id === action.bet.playerId);

      if (betIndex > -1 && playerIndex > -1) {
        const bet = {
          ...action.bet,
          status: action.type === 'WIN_BET' ? 'WON' : 'LOST',
        };

        const player = state.players[playerIndex];

        const currentScore = player.scores.length > 0
          ? player.scores[player.scores.length - 1].value
          : 0;

        return {
          ...state,
          bets: [
            ...state.bets.slice(0, betIndex),
            bet,
            ...state.bets.slice(betIndex + 1),
          ],
          players: [
            ...state.players.slice(0, playerIndex),
            {
              ...player,
              scores: [
                ...player.scores,
                {
                  betId: bet.id,
                  timestamp: bet.timestamp,
                  score: action.type === 'WIN_BET'
                    ? currentScore + 10 + bet.value
                    : currentScore - bet.value,
                },
              ],
            },
            ...state.players.slice(playerIndex + 1),
          ],
        };
      }

      return state;
    }
    default:
      return initialState;
  }
};

export default reducer;
