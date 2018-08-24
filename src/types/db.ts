import { TimedEntityStatus } from "./store";

export interface IGameDbRow {
  id: string;
  startDate: number;
  status: TimedEntityStatus;
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
  name: string;
}
