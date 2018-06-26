import { getClosedHandsByGame, getBetsByGame, getPlayersByGame } from './db';

// eslint-disable-next-line import/prefer-default-export
export const getScoresByGame = async (gameId) => {
  const hands = await getClosedHandsByGame(gameId);
  const bets = await getBetsByGame(gameId);
  const players = await getPlayersByGame(gameId);

  return hands
    .sort((handA, handB) =>
      parseFloat(handA.dealtTimestamp) - parseFloat(handB.dealtTimestamp))
    .reduce(
      (scores, hand) => {
        const [previousHand] = scores.slice(-1);

        return [{
          ...hand,
          scores: players.map((player) => {
            const bet = bets
              .find(({ playerId, handId }) => playerId === player.id && handId === hand.id);

            const previousScore = previousHand ? previousHand.scores
              .find(({ playerId }) => playerId === player.id) : { score: 0 };

            if (bet) {
              const won = bet.value === bet.result;
              return {
                playerId: player.id,
                isDealer: player.id === hand.dealerId,
                score: previousScore.score + (won ? 10 + bet.value : -bet.value),
                bet: {
                  won,
                  value: bet.value,
                  result: bet.result,
                },
              };
            }

            return {
              playerId: player.id,
            };
          }),
        }];
      },
      [],
    );
};
