import { Player, isSamePlayer } from "./player";

// Score Types
export type Point = number;

export type PointsData = {
  PLAYER_ONE: Point;
  PLAYER_TWO: Point;
};

export type Points = {
  kind: "POINTS";
  pointsData: PointsData;
};

export type Deuce = { kind: "DEUCE" };

export type Forty = {
  kind: "FORTY";
  player: Player;
  otherPlayerPoints: Point;
};

export type Advantage = {
  kind: "ADVANTAGE";
  player: Player;
};

export type Game = {
  kind: "GAME";
  player: Player;
};

export type Score = Points | Deuce | Forty | Advantage | Game;

// Function to get next score
export const nextScore = (currentScore: Score, pointWinner: Player): Score => {
  switch (currentScore.kind) {
    case "POINTS": {
      const newPoints = {
        ...currentScore.pointsData,
        [pointWinner]: currentScore.pointsData[pointWinner] + 15,
      };

      const playerOnePoints = newPoints.PLAYER_ONE;
      const playerTwoPoints = newPoints.PLAYER_TWO;

      if (playerOnePoints >= 40 && playerTwoPoints >= 40) {
        return deuce();
      }

      if (playerOnePoints === 40 || playerTwoPoints === 40) {
        return forty(pointWinner, newPoints[pointWinner === "PLAYER_ONE" ? "PLAYER_TWO" : "PLAYER_ONE"]);
      }

      return { kind: "POINTS", pointsData: newPoints };
    }

    case "DEUCE":
      return advantage(pointWinner);

    case "FORTY":
      return isSamePlayer(pointWinner, currentScore.player) ? game(pointWinner) : deuce();

    case "ADVANTAGE":
      return isSamePlayer(pointWinner, currentScore.player) ? game(pointWinner) : deuce();

    case "GAME":
      return currentScore; // No changes after game is won
  }
};

// Type Constructors
export const deuce = (): Deuce => ({ kind: "DEUCE" });

export const forty = (player: Player, otherPlayerPoints: Point): Forty => ({
  kind: "FORTY",
  player,
  otherPlayerPoints,
});

export const advantage = (player: Player): Advantage => ({
  kind: "ADVANTAGE",
  player,
});

export const game = (winner: Player): Game => ({
  kind: "GAME",
  player: winner,
});
