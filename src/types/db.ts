export interface IGameDbRow {
  id: string;
}

export interface IHandDbRow {
  id: string;
  gameId: string;
}

export interface IRoundDbRow {
  id: string;
  handId: string;
}

export interface IBetDbRow {
  id: string;
  handId: string;
}

export interface IPlayerDbRow {
  id: string;
  gameId: string;
}
