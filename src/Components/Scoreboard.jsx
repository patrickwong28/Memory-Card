import React from 'react';

export default function Scoreboard({ score, highscore }) {
  return (
    <div className="scoreboard">
      <h2 className="scores">Score: {score}</h2>
      <h2 className="scores">Highscore: {highscore}</h2>
    </div>
  );
}
