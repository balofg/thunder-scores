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

export type IGameState =
  | ITimedEntity & {
      players: IPlayerState[];
    }
  | null;

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
  game: IGameState;
  hands: IHandState[];
}
