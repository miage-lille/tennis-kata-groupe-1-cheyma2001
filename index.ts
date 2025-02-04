import { Player, isSamePlayer } from './types/player';
import { Point, PointsData, Score,forty, advantage, deuce, game, Forty } from './types/score';

// import { none, Option, some, match as matchOpt } from 'fp-ts/Option';
// import { pipe } from 'fp-ts/lib/function';

// -------- Tooling functions --------- //

export const playerToString = (player: Player) => {
  switch (player) {
    case 'PLAYER_ONE':
      return 'Player 1';
    case 'PLAYER_TWO':
      return 'Player 2';
  }
};
export const otherPlayer = (player: Player) => {
  switch (player) {
    case 'PLAYER_ONE':
      return 'PLAYER_TWO';
    case 'PLAYER_TWO':
      return 'PLAYER_ONE';
  }
};
// Exercice 1 :

export const pointToString = (point: Point): string => {
  switch (point) {
    case 0: return 'Love';
    case 15: return 'Fifteen';
    case 30: return 'Thirty';
    case 40: return 'Forty';
    default: return 'Invalid';
  }
}

export const scoreToString = (score: Score): string => {
  switch (score.kind) {
    case "POINTS":
      return `Points - Player One: ${score.pointsData.PLAYER_ONE}, Player Two: ${score.pointsData.PLAYER_TWO}`;
    case "DEUCE":
      return "Deuce";
    case "FORTY":
      return `Forty - ${playerToString(score.player)} is leading`;
    case "ADVANTAGE":
      return `Advantage - ${playerToString(score.player)}`;
    case "GAME":
      return `Game won by ${playerToString(score.player)}`;
  }
};

export const scoreWhenDeuce = (winner: Player): Score => {
  return advantage(winner);
};

export const scoreWhenAdvantage = (advantagedPlayer: Player, winner: Player): Score => {
  return isSamePlayer(advantagedPlayer, winner) ? game(winner) : deuce();
};

export const scoreWhenForty = (currentForty: Forty, winner: Player): Score => {
  return isSamePlayer(currentForty.player, winner) ? game(winner) : deuce();
};

export const scoreWhenGame = (winner: Player): Score => {
  // Since the game is over, return the "GAME" state with the winner
  return game(winner);
};

// Exercice 2
// Tip: You can use pipe function from fp-ts to improve readability.
// See scoreWhenForty function above.
// export const scoreWhenPoint = (current: PointsData, winner: Player): Score => {
//   const newPoints = {
//     ...current,
//     [winner]: current[winner] + 15
//   };

//   const playerOnePoints = newPoints.PLAYER_ONE;
//   const playerTwoPoints = newPoints.PLAYER_TWO;

//   if (playerOnePoints >= 40 && playerTwoPoints >= 40) {
//     return deuce();
//   }

//   if (playerOnePoints === 40 || playerTwoPoints === 40) {
//     return forty(winner, newPoints[otherPlayer(winner)]);
//   }

//   return { kind: "POINTS", pointsData: newPoints };
// };
export const scoreWhenPoint = (current: PointsData, winner: Player): Score => {
  const playerOnePoints = current.PLAYER_ONE;
  const playerTwoPoints = current.PLAYER_TWO;

  // 1️⃣ Vérifier si les deux joueurs arrivent à 40 → DEUCE
  if (
    (winner === 'PLAYER_ONE' && playerOnePoints === 30 && playerTwoPoints === 40) ||
    (winner === 'PLAYER_TWO' && playerTwoPoints === 30 && playerOnePoints === 40) ||
    (winner === 'PLAYER_ONE' && playerOnePoints === 30 && playerTwoPoints === 30) ||
    (winner === 'PLAYER_TWO' && playerTwoPoints === 30 && playerOnePoints === 30)
  ) {
    return deuce();
  }

  // 2️⃣ Si le gagnant passe de 30 à 40 → Retourner un score "FORTY"
  if (winner === 'PLAYER_ONE' && playerOnePoints === 30) {
    return forty('PLAYER_ONE', playerTwoPoints);
  } else if (winner === 'PLAYER_TWO' && playerTwoPoints === 30) {
    return forty('PLAYER_TWO', playerOnePoints);
  }

  // 3️⃣ Incrémenter normalement les points si le score est inférieur à 30
  const newPoints = {
    ...current,
    [winner]: current[winner] === 15 ? 30 : 15, // 15 → 30, 0 → 15
  };

  return {
    kind: 'POINTS',
    pointsData: newPoints,
  };
};


export const score = (currentScore: Score, winner: Player): Score => {
  switch (currentScore.kind) {
    case "POINTS":
      return scoreWhenPoint(currentScore.pointsData, winner);
    case "DEUCE":
      return scoreWhenDeuce(winner);
    case "FORTY":
      return scoreWhenForty(currentScore, winner);
    case "ADVANTAGE":
      return scoreWhenAdvantage(currentScore.player, winner);
    case "GAME":
      return scoreWhenGame(winner);
  }
};
