import * as React from "react";
import { Redirect } from "react-router-dom";

import Loader from "../../components/Loader";
import { endGameRequest } from "../../store/actions/game";
import { IHandScores } from "../../store/selectors/scores";
import {
  BetStatus,
  IGameState,
  ILoadableResource,
  TimedEntityStatus
} from "../../types/store";

interface IScoreboardProps {
  endGame: typeof endGameRequest;
  game: ILoadableResource<IGameState>;
  handsScores: IHandScores[];
}

const betStatusColors = {
  [BetStatus.WON]: "success",
  [BetStatus.LOST]: "danger"
};

const Scoreboard = ({ endGame, game, handsScores }: IScoreboardProps) => {
  if (game.loading) {
    return <Loader />;
  }

  if (game.data) {
    return (
      <div className="section">
        <div className="container">
          <div className="content">
            <h1 className="title">Scoreboard</h1>

            <div className="level">
              {game.data.status === TimedEntityStatus.OPEN ? (
                <React.Fragment>
                  <div className="level-item">
                    <a className="button" href="#/game">
                      <span className="icon">
                        <i className="fas fa-arrow-left" />
                      </span>
                      <span>Back to the game</span>
                    </a>
                  </div>
                  <div className="level-item">
                    <button
                      className="button is-danger is-outlined"
                      // tslint:disable jsx-no-lambda
                      onClick={() =>
                        game && game.data ? endGame(game.data.id) : undefined
                      }
                    >
                      <span className="icon">
                        <i className="fas fa-check" />
                      </span>
                      <span>End game</span>
                    </button>
                  </div>
                </React.Fragment>
              ) : null}

              {game.data.status === TimedEntityStatus.CLOSED ? (
                <div className="level-item">
                  <a className="button is-primary" href="#/players">
                    <span className="icon">
                      <i className="fas fa-bolt" />
                    </span>
                    <span>New game</span>
                  </a>
                </div>
              ) : null}
            </div>
          </div>
          <div className="content">
            <table className="table is-fullwidth">
              <thead>
                <tr>
                  <th className="has-text-centered">#</th>
                  {game.data.players.map(player => (
                    <th key={player.id} className="has-text-centered">
                      {player.name}
                    </th>
                  ))}
                </tr>
              </thead>

              <tbody>
                {!handsScores.length ? (
                  <tr>
                    <td
                      colSpan={1 + game.data.players.length}
                      className="has-text-centered"
                    >
                      <em>There's nothing here.</em>
                    </td>
                  </tr>
                ) : null}
                {handsScores.map(handScore => (
                  <tr key={handScore.id}>
                    <td className="has-text-centered">
                      {handScore.cardsCount}
                    </td>
                    {handScore.scores.map(playerScore => (
                      <td
                        key={playerScore.player.id}
                        className="has-text-grey has-text-centered"
                      >
                        <div className="columns is-mobile is-gapless">
                          <div className="column is-one-third">
                            {playerScore.player.isDealer ? (
                              <span className="icon">
                                <i className="fas fa-star" />
                              </span>
                            ) : null}
                          </div>
                          <div
                            className={`column is-one-third has-text-${
                              betStatusColors[playerScore.bet.status]
                            }`}
                          >
                            {playerScore.score}
                          </div>
                          <div className="column is-one-third">
                            ({playerScore.bet.value})
                          </div>
                        </div>
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>

              {handsScores.length ? (
                <tfoot>
                  <tr>
                    <td />
                    {handsScores[handsScores.length - 1].scores.map(
                      playerScore => (
                        <td
                          className="has-text-centered is-size-4"
                          key={playerScore.player.id}
                        >
                          {playerScore.score}
                        </td>
                      )
                    )}
                  </tr>
                </tfoot>
              ) : null}
            </table>
          </div>
        </div>
      </div>
    );
  }

  return <Redirect to="players" />;
};

export default Scoreboard;
