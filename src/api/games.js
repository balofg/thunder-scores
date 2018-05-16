import moment from 'moment';
import uniqid from 'uniqid';

import {
  getOpenGames,
  getClosedGames,
  getGame,
  getPlayersByGame,
  saveGame,
  savePlayers,
} from './db';

export {
  getOpenGames,
  getClosedGames,
  getGame,
  getPlayersByGame,
};

export const startGame = async (playerNames) => {
  const game = {
    id: uniqid(),
    startedTimestamp: moment().valueOf(),
    status: 'OPEN',
    pausedTimestamps: [],
    resumedTimestamps: [],
  };

  const players = playerNames.map(name => ({
    id: uniqid(),
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
