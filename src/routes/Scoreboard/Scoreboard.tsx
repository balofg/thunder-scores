import * as React from "react";
import { Redirect } from "react-router-dom";

import { IHandScores } from "../../store/selectors/scores";
import { BetStatus, IGameState, TimedEntityStatus } from "../../types/store";

interface IScoreboardProps {
  game: IGameState;
  handsScores: IHandScores[];
}

const betStatusColors = {
  [BetStatus.WON]: "success",
  [BetStatus.LOST]: "danger"
};

const Scoreboard = ({ game, handsScores }: IScoreboardProps) =>
  game ? (
    <div className="section">
      <div className="container">
        <h1 className="title">Scoreboard</h1>
        {game.status === TimedEntityStatus.OPEN ? (
          <a
            className="button"
            href="#/game"
            style={{ marginBottom: "1.5rem" }}
          >
            <span className="icon">
              <i className="fas fa-arrow-left" />
            </span>
            <span>Back to the game</span>
          </a>
        ) : null}

        <table className="table is-fullwidth">
          <thead>
            <th className="has-text-centered">#</th>
            {game.players.map(player => (
              <th key={player.id} className="has-text-centered">
                {player.name}
              </th>
            ))}
          </thead>

          <tbody>
            {handsScores.map(handScore => (
              <tr key={handScore.id}>
                <td className="has-text-centered">{handScore.cardsCount}</td>
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

          <tfoot>
            <td />
            {handsScores[handsScores.length - 1].scores.map(playerScore => (
              <td className="has-text-centered is-size-4" key={playerScore.player.id}>{playerScore.score}</td>
            ))}
          </tfoot>
        </table>
      </div>
    </div>
  ) : (
    <Redirect to="players" />
  );

export default Scoreboard;
