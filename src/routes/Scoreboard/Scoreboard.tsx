import * as React from "react";

import { IHandScores } from "../../store/selectors/scores";

interface IScoreboardProps {
  scores: IHandScores[];
}

const Scoreboard = (props: IScoreboardProps) => (
  <pre>{JSON.stringify(props.scores, null, 4)}</pre>
);

export default Scoreboard;
