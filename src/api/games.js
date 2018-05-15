import moment from 'moment';
import { v4 } from 'uuid';

import { getOpenGames, getClosedGames, saveGame, savePlayers } from './db';

export {
  getOpenGames,
  getClosedGames,
};

export const startGame = async (playerNames) => {
  const game = {
    id: v4(),
    startedTimestamp: moment().valueOf(),
    status: 'OPEN',
    pausedTimestamps: [],
    resumedTimestamps: [],
  };

  const players = playerNames.map(name => ({
    id: v4(),
    name,
    gameId: game.id,
  }));

  await saveGame(game);
  await savePlayers(players);

  return {
    game,
    players,
  };
};

export const pauseGame = async (game) => {
  const pausedGame = {
    ...game,
    pausedTimestamps: [
      ...game.pausedTimestamps,
      moment().valueOf(),
    ],
  };

  await saveGame(game);

  return pausedGame;
};

export const resumeGame = async (game) => {
  const resumedGame = {
    ...game,
    resumedTimestamps: [
      ...game.resumedTimestamps,
      moment().valueOf(),
    ],
  };

  await saveGame(game);

  return resumedGame;
};

export const endGame = async (game) => {
  const endedGame = {
    ...game,
    endedTimestamp: moment().valueOf(),
    status: 'CLOSED',
  };

  await saveGame(endedGame);

  return endedGame;
};
