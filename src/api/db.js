import idb from 'idb';

class DB {
  constructor() {
    this.db = idb.open('thunder', 1, (upgradeDb) => {
      const gamesStore = upgradeDb.createObjectStore('games', { keyPath: 'id' });
      gamesStore.createIndex('status', 'status', { unique: false });

      const playersStore = upgradeDb.createObjectStore('players', { keyPath: 'id' });
      playersStore.createIndex('game', 'gameId', { unique: false });

      const handsStore = upgradeDb.createObjectStore('hands', { keyPath: 'id' });
      handsStore.createIndex('game', 'gameId', { unique: false });
      handsStore.createIndex('dealer', 'dealerId', { unique: false });

      const betsStore = upgradeDb.createObjectStore('bets', { keyPath: 'id' });
      betsStore.createIndex('hand', 'handId', { unique: false });
      betsStore.createIndex('player', 'playerId', { unique: false });
    });
  }

  async getOpenGames() {
    const db = await this.db;
    const transaction = db.transaction(['games']);

    transaction
      .objectStore('games')
      .index('status')
      .getAll('OPEN');

    return transaction.complete;
  }

  async getPlayersByGame(gameId) {
    const db = await this.db;
    const transaction = db.transaction(['players']);

    transaction
      .objectStore('players')
      .index('game')
      .getAll(gameId);

    return transaction.complete;
  }

  async getHandsByGame(gameId) {
    const db = await this.db;
    const transaction = db.transaction(['hands']);

    transaction
      .objectStore('hands')
      .index('game')
      .getAll(gameId);

    return transaction.complete;
  }

  async getBetsByHand(handId) {
    const db = await this.db;
    const transaction = db.transaction(['bets']);

    transaction
      .objectStre('bets')
      .index('hand')
      .getAll(handId);

    return transaction.complete;
  }

  async getBetsByPlayer(playerId) {
    const db = await this.db;
    const transaction = db.transaction(['bets']);

    transaction
      .objectStore('bets')
      .index('player')
      .getAll(playerId);

    return transaction.complete;
  }

  async saveGame(game) {
    const db = await this.db;
    const transaction = db.transaction(['games'], 'readwrite');

    transaction
      .objectStore('games')
      .put(game);

    return transaction.complete;
  }

  async savePlayers(players) {
    const db = await this.db;
    const transaction = db.transaction(['players'], 'readwrite');
    const store = transaction.objectStore('players');

    players.forEach(player => store.put(player));

    return transaction.complete;
  }

  async saveHand(hand) {
    const db = await this.db;
    const transaction = db.transaction(['hands'], 'readwrite');

    transaction
      .objectStore('hands')
      .put(hand);

    return transaction.complete;
  }

  async saveBet(bet) {
    const db = await this.db;
    const transaction = db.transaction(['bets'], 'readwrite');

    transaction
      .objectStore('bets')
      .put(bet);

    return transaction.complete;
  }
}

export default new DB();
