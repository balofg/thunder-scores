export enum Status {
  OPEN,
  CLOSED,
  ABORTED,
}

interface ITimedEntity {
  id: string;
  startDate: number;
  endDate?: number;
  status: Status;
}

export interface IGameState extends ITimedEntity {
  playerIds: string[];
}

export interface IPlayerState extends ITimedEntity {
  id: string;
  name: string;
}

export interface IHandState extends ITimedEntity {
  cardsCount: number;
  dealerId: string;
  gameId: string;
}

export interface IRoundState extends ITimedEntity {
  winnerId: string;
  handId: string;
}

export interface IBetState {
  value: number;
  playerId: string;
  handId: string;
}