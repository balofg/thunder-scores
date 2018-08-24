import Dexie from "dexie";

import {
  IBetDbRow,
  IGameDbRow,
  IHandDbRow,
  IPlayerDbRow,
  IRoundDbRow
} from "../types/db";

class ThunderDB extends Dexie {
  public bets: Dexie.Table<IBetDbRow, string>;
  public games: Dexie.Table<IGameDbRow, string>;
  public hands: Dexie.Table<IHandDbRow, string>;
  public players: Dexie.Table<IPlayerDbRow, string>;
  public rounds: Dexie.Table<IRoundDbRow, string>;

  constructor() {
    super("ThunderDB");

    this.version(1).stores({
      bets: "&id, handId",
      games: "&id",
      hands: "&id, gameId",
      players: "&id, gameId",
      rounds: "&id, handId"
    });
  }
}

export default new ThunderDB();
