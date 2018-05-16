import idb from 'idb';

// eslint-disable-next-line no-underscore-dangle
const _db = idb.open('thunder', 1, (upgradeDb) => {
  const gamesStore = upgradeDb.createObjectStore('games', { keyPath: 'id' });
  gamesStore.createIndex('status', 'status', { unique: false });

  const playersStore = upgradeDb.createObjectStore('players', { keyPath: 'id' });
  playersStore.createIndex('game', 'gameId', { unique: false });

  const handsStore = upgradeDb.createObjectStore('hands', { keyPath: 'id' });
  handsStore.createIndex('game', 'gameId', { unique: false });
  handsStore.createIndex('status', ['gameId', 'status'], { unique: false });

  const betsStore = upgradeDb.createObjectStore('bets', { keyPath: 'id' });
  betsStore.createIndex('hand', 'handId', { unique: false });
  betsStore.createIndex('game', 'gameId', { unique: false });

  const scoresStore = upgradeDb.createObjectStore('scores', { keyPath: 'id' });
  scoresStore.createIndex('game', 'gameId', { unique: false });
});

export const getOpenGames = async () => {
  const db = await _db;

  return db
    .transaction(['games'])
    .objectStore('games')
    .index('status')
    .getAll('OPEN');
};

export const getClosedGames = async () => {
  const db = await _db;

  return db
    .transaction(['games'])
    .objectStore('games')
    .index('status')
    .getAll('CLOSED');
};

export const getGame = async (gameId) => {
  const db = await _db;

  return db
    .transaction(['games'])
    .objectStore('games')
    .get(gameId);
};

export const getPlayersByGame = async (gameId) => {
  const db = await _db;

  return db
    .transaction(['players'])
    .objectStore('players')
    .index('game')
    .getAll(gameId);
};

export const getHandsByGame = async (gameId) => {
  const db = await _db;

  return db
    .transaction(['hands'])
    .objectStore('hands')
    .index('game')
    .getAll(gameId);
};

export const getClosedHandsByGame = async (gameId) => {
  const db = await _db;

  return db
    .transaction(['hands'])
    .objectStore('hands')
    .index('status')
    .getAll([gameId, 'CLOSED']);
};

export const getBetsByHand = async (handId) => {
  const db = await _db;

  return db
    .transaction(['bets'])
    .objectStore('bets')
    .index('hand')
    .getAll(handId);
};

export const getBetsByGame = async (gameId) => {
  const db = await _db;

  return db
    .transaction(['bets'])
    .objectStore('bets')
    .index('game')
    .getAll(gameId);
};

export const getScoresByGame = async (gameId) => {
  const db = await _db;

  return db
    .transaction(['scores'])
    .objectStore('scores')
    .index('game')
    .getAll(gameId);
};

export const saveGame = async (game) => {
  const db = await _db;
  const transaction = db.transaction(['games'], 'readwrite');

  transaction
    .objectStore('games')
    .put(game);

  return transaction.complete;
};

export const savePlayers = async (players) => {
  const db = await _db;
  const transaction = db.transaction(['players'], 'readwrite');
  const store = transaction.objectStore('players');

  players.forEach(player => store.put(player));

  return transaction.complete;
};

export const saveHand = async (hand) => {
  const db = await _db;
  const transaction = db.transaction(['hands'], 'readwrite');

  transaction
    .objectStore('hands')
    .put(hand);

  return transaction.complete;
};

export const saveBet = async (bet) => {
  const db = await _db;
  const transaction = db.transaction(['bets'], 'readwrite');

  transaction
    .objectStore('bets')
    .put(bet);

  return transaction.complete;
};
