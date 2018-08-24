import { call, put, takeEvery } from "redux-saga/effects";

import { endGame, startGame } from "../../api/game";
import {
  endGameFailure,
  endGameSuccess,
  IGameEndRequestAction,
  IGameStartRequestAction,
  startGameFailure,
  startGameSuccess
} from "../actions/game";

function* doStartGame(action: IGameStartRequestAction) {
  try {
    const { game, players } = yield call(startGame, action.playerNames);
    yield put(startGameSuccess(game, players));
  } catch (error) {
    yield put(startGameFailure(error));
  }
}

function* doEndGame(action: IGameEndRequestAction) {
  try {
    const endDate = yield call(endGame, action.gameId);
    yield put(endGameSuccess(endDate));
  } catch (error) {
    yield put(endGameFailure(error));
  }
}

export default function*() {
  yield takeEvery("GAME_START_REQUEST", doStartGame);
  yield takeEvery("GAME_END_REQUEST", doEndGame);
}
