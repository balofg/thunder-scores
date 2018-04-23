import { connect } from 'react-redux';
import Scoreboard from './Scoreboard';

export default connect(state => ({
  players: state.players.map(player => ({
    id: player.id,
    name: player.name,
  })),
  hands: [...state.hands]
    .sort((a, b) => a.dealtTimestamp - b.dealtTimestamp)
    .reduce(
      (hands, hand) => {
        const bets =
          state.bets
            .filter(({ handId }) => handId === hand.id)
            .map((bet) => {
              const player = state.players.find(({ id }) => id === bet.playerId);
              const betScore = player.scores.find(({ betId }) => betId === bet.id);

              return ({
                player: player.id,
                cards: hand.cardsCount,
                score: betScore.score,
                isDealer: player.id === hand.dealerId,
                hasLost: bet.value !== bet.result,
              });
            });

        return [
          ...hands,
          {
            id: hand.id,
            cards: hand.cardsCount,
            bets,
          },
        ];
      },
      [],
    ),
}))(Scoreboard);
