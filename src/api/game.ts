import * as uniqid from "uniqid";

import db from "../db";
import { TimedEntityStatus } from "../types/store";

export async function startGame(playerNames: string[]) {
  const game = {
    id: uniqid(),
    startDate: Date.now(),
    status: TimedEntityStatus.OPEN
  };

  const players = playerNames.map(name => ({
    gameId: game.id,
    id: uniqid(),
    name
  }));

  await db.transaction("rw", db.games, db.players, async () => {
    await db.games.add(game);
    await db.players.bulkAdd(players);
  });

  return {
    game,
    players
  };
}

export async function endGame(gameId: string) {
  const endDate = Date.now();

  await db.games.update(gameId, {
    endDate,
    status: TimedEntityStatus.CLOSED
  });

  return endDate;
}
