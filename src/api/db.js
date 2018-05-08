import idb from 'idb';

// eslint-disable-next-line no-underscore-dangle
const _db = idb.open('thunder', 1, (upgradeDb) => {
  const gamesStore = upgradeDb.createObjectStore('games', { keyPath: 'id' });
  gamesStore.createIndex('status', 'status', { unique: false });

  const playersStore = upgradeDb.createObjectStore('players', { keyPath: 'id' });
  playersStore.createIndex('game', 'gameId', { unique: false });

  const handsStore = upgradeDb.createObjectStore('hands', { keyPath: 'id' });
  handsStore.createIndex('game', 'gameId', { unique: false });
  handsStore.createIndex('dealer', 'dealerId', { unique: false });

  const betsStore = upgradeDb.createObjectStore('bets', { keyPath: 'id' });
  betsStore.createIndex('hand', 'handId', { unique: false });
  betsStore.createIndex('game', 'gameId', { unique: false });
});

export const getOpenGames = async () => {
  const db = await _db;
  const transaction = db.transaction(['games']);

  transaction
    .objectStore('games')
    .index('status')
    .getAll('OPEN');

  return transaction.complete;
};

export const getClosedGames = async () => {
  const db = await _db;
  const transaction = db.transaction(['games']);

  transaction
    .objectStore('games')
    .index('status')
    .getAll('CLOSED');

  return transaction.complete;
};

export const getPlayersByGame = async (gameId) => {
  const db = await _db;
  const transaction = db.transaction(['players']);

  transaction
    .objectStore('players')
    .index('game')
    .getAll(gameId);

  return transaction.complete;
};

export const getHandsByGame = async (gameId) => {
  const db = await _db;
  const transaction = db.transaction(['hands']);

  transaction
    .objectStore('hands')
    .index('game')
    .getAll(gameId);

  return transaction.complete;
};

export const getBetsByHand = async (handId) => {
  const db = await _db;
  const transaction = db.transaction(['bets']);

  transaction
    .objectStre('bets')
    .index('hand')
    .getAll(handId);

  return transaction.complete;
};

export const getBetsByPlayer = async (playerId) => {
  const db = await _db;
  const transaction = db.transaction(['bets']);

  transaction
    .objectStore('bets')
    .index('player')
    .getAll(playerId);

  return transaction.complete;
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
