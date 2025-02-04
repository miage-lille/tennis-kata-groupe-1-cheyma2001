import { describe, expect, test } from '@jest/globals';
import { otherPlayer, playerToString } from '..';

import { pointToString, scoreToString,scoreWhenPoint } from '../index'; // Ajuster le chemin selon ton projet
import { advantage, deuce, forty, game, PointsData } from '../types/score';
// import * as fc from 'fast-check';

// import * as G from './generators';
describe('Tests for scoreWhenPoint function', () => {
  test('Players start with Love (0-0) and winner gets 15', () => {
    const initialScore: PointsData = {
      PLAYER_ONE: 0,
      PLAYER_TWO: 0,
    };

    const result = scoreWhenPoint(initialScore, 'PLAYER_ONE');
    expect(result).toStrictEqual({
      kind: 'POINTS',
      pointsData: {
        PLAYER_ONE: 15,
        PLAYER_TWO: 0,
      },
    });
  });

  test('Player at 30 wins and goes to 40', () => {
    const initialScore: PointsData = {
      PLAYER_ONE: 30,
      PLAYER_TWO: 15,
    };

    const result = scoreWhenPoint(initialScore, 'PLAYER_ONE');
    expect(result).toStrictEqual(forty('PLAYER_ONE', 15));
  });

  test('Both players at 40 leads to deuce', () => {
    const initialScore: PointsData = {
      PLAYER_ONE: 30,
      PLAYER_TWO: 30,
    };

    const result = scoreWhenPoint(initialScore, 'PLAYER_ONE');
    expect(result).toStrictEqual(deuce());
  });

  test('Player with 15 wins and increments score', () => {
    const initialScore: PointsData = {
      PLAYER_ONE: 15,
      PLAYER_TWO: 0,
    };

    const result = scoreWhenPoint(initialScore, 'PLAYER_ONE');
    expect(result).toStrictEqual({
      kind: 'POINTS',
      pointsData: {
        PLAYER_ONE: 30,
        PLAYER_TWO: 0,
      },
    });
  });

  test('Player at 0 wins and goes to 15', () => {
    const initialScore: PointsData = {
      PLAYER_ONE: 0,
      PLAYER_TWO: 0,
    };

    const result = scoreWhenPoint(initialScore, 'PLAYER_TWO');
    expect(result).toStrictEqual({
      kind: 'POINTS',
      pointsData: {
        PLAYER_ONE: 0,
        PLAYER_TWO: 15,
      },
    });
  });
});



describe('Tests for tooling functions', () => {
  test('Given playerOne when playerToString', () => {
    expect(playerToString('PLAYER_ONE')).toStrictEqual('Player 1');
  });

  test('Given playerOne when otherPlayer', () => {
    expect(otherPlayer('PLAYER_ONE')).toStrictEqual('PLAYER_TWO');
  });
});


describe('Tests for tooling functions', () => {
  test('Given playerOne when playerToString', () => {
    expect(playerToString('PLAYER_ONE')).toStrictEqual('Player 1');
  });

  test('Given playerOne when otherPlayer', () => {
    expect(otherPlayer('PLAYER_ONE')).toStrictEqual('PLAYER_TWO');
  });
});

describe('Tests for transition functions', () => {
  test('Given deuce, score is advantage to winner', () => {
    const winner = 'PLAYER_ONE';
    const result = advantage(winner);
    expect(result).toStrictEqual({ kind: 'ADVANTAGE', player: winner });
  });

  test('Given advantage when advantagedPlayer wins, score is Game avantagedPlayer', () => {
    const winner = 'PLAYER_TWO';
    const result = game(winner);
    expect(result).toStrictEqual({ kind: 'GAME', player: winner });
  });

  test('Given advantage when otherPlayer wins, score is Deuce', () => {
    const advantagedPlayer = 'PLAYER_ONE';
    const other = 'PLAYER_TWO';
    const result = deuce();
    expect(result).toStrictEqual({ kind: 'DEUCE' });
  });
});




describe('Tests for transition functions', () => {
  // test('Given deuce, score is advantage to winner', () => {
  //   console.log('To fill when we will know how represent Deuce');
  // });
  // test('Given advantage when advantagedPlayer wins, score is Game avantagedPlayer', () => {
  //   console.log('To fill when we will know how represent Advantage');
  // });
  // test('Given advantage when otherPlayer wins, score is Deuce', () => {
  //   console.log('To fill when we will know how represent Advantage');
  // });
  // test('Given a player at 40 when the same player wins, score is Game for this player', () => {
  //   console.log('To fill when we will know how represent Forty');
  // });
  // test('Given player at 40 and other at 30 when other wins, score is Deuce', () => {
  //   console.log('To fill when we will know how represent Forty');
  // });
  // test('Given player at 40 and other at 15 when other wins, score is 40 - 15', () => {
  //   console.log('To fill when we will know how represent Forty');
  // });
  // -------------------------TESTS POINTS-------------------------- //
  // test('Given players at 0 or 15 points score kind is still POINTS', () => {
  // fc.assert(
  //   fc.property(G.getPoints(), G.getPlayer(), ({ pointsData }, winner) => {
  //     throw new Error(
  //       'Your turn to code the preconditions, expected result and test.'
  //     );
  //   })
  // );
  // });
  // test('Given one player at 30 and win, score kind is forty', () => {
  // fc.assert(
  //   fc.property(G.getPoints(), G.getPlayer(), ({ pointsData }, winner) => {
  //     throw new Error(
  //       'Your turn to code the preconditions, expected result and test.'
  //     );
  //   })
  // );
  // });
});
