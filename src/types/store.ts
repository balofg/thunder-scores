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

export interface ILoadableResource<T> {
  loading: boolean;
  error?: Error;
  data?: T;
} 

interface ITimedEntity {
  id: string;
  startDate: number;
  endDate?: number;
  status: TimedEntityStatus;
}

export interface IGameState extends ITimedEntity {
  players: IPlayerState[];
};

export interface IPlayerState {
  id: string;
  name: string;
}

export interface IHandState extends ITimedEntity {
  cardsCount: number;
  dealerId: string;
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

export interface IStore {
  game: ILoadableResource<IGameState>;
  hands: IHandState[];
}
