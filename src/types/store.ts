export enum TimedEntityStatus {
  OPEN,
  CLOSED,
  ABORTED
}

export enum BetStatus {
  OPEN,
  ABORTED,
  WON,
  LOST
}

interface ITimedEntity {
  id: string;
  startDate: number;
  endDate?: number;
  status: TimedEntityStatus;
}

export interface IGameState extends ITimedEntity {
  players: IPlayerState[];
}

export interface IPlayerState extends ITimedEntity {
  id: string;
  name: string;
}

export interface IHandState extends ITimedEntity {
  cardsCount: number;
  dealerId: string;
  gameId: string;
  bets: IBetState[];
  rounds: IRoundState[];
}

export interface IRoundState extends ITimedEntity {
  winnerId?: string;
}

export interface IBetState {
  id: string;
  value: number;
  playerId: string;
  status: BetStatus;
  timestamp: number;
}

export interface IApplicationState {
  game: IGameState;
  hands: IHandState[];
}
