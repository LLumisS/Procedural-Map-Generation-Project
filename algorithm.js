'use strict';

function generateMatrix(length, randomCorners) {
  const matrix = Array(length).fill(null).map(() => Array(length).fill(0));

  matrix[0][length - 1] = randomValue(-randomCorners, randomCorners);
  matrix[length - 1][0] = randomValue(-randomCorners, randomCorners);
  matrix[0][0] = randomValue(-randomCorners, randomCorners);
  matrix[length - 1][length - 1] = randomValue(-randomCorners, randomCorners);

  return matrix;
}

function diamondSquare(matrix, randomRange) {
  let chunkSize = matrix.length - 1;

  for (; chunkSize > 1; chunkSize /= 2, randomRange /= 2) {
    stageDiamond(matrix, chunkSize, randomRange);
    stageSquare(matrix, chunkSize, randomRange);
  }

  return matrix;
}

function stageDiamond(matrix, chunkSize, randomFactor) {
  const length = matrix.length;

  for (let y = 0; y < length - 1; y += chunkSize) {
    for (let x = 0; x < length - 1; x += chunkSize) {
      const BOTTOM_RIGHT = matrix[y + chunkSize] ?
        matrix[y + chunkSize][x + chunkSize] :
        null;
      const BOTTOM_LEFT = matrix[y + chunkSize] ?
        matrix[y + chunkSize][x] :
        null;
      const TOP_LEFT = matrix[y][x];
      const TOP_RIGHT = matrix[y][x + chunkSize];

      const result = averageValue(
        BOTTOM_RIGHT,
        BOTTOM_LEFT,
        TOP_LEFT,
        TOP_RIGHT
      ) + randomValue(-randomFactor, randomFactor);

      const CHANGED_ROW = y + chunkSize / 2;
      const CHANGED_COLUMN = x + chunkSize / 2;

      matrix[CHANGED_ROW][CHANGED_COLUMN] = result;
    }
  }
}

function stageSquare(matrix, chunkSize, randomFactor) {
  const half = chunkSize / 2;
  const length = matrix.length;

  for (let y = 0; y < length; y += half) {
    for (let x = (y + half) % chunkSize; x < length; x += chunkSize) {
      const BOTTOM = matrix[y + half] ? matrix[y + half][x] : null;
      const TOP = matrix[y - half] ? matrix[y - half][x] : null;
      const LEFT = matrix[y][x - half];
      const RIGHT = matrix[y][x + half];

      const result = averageValue(
        BOTTOM,
        TOP,
        LEFT,
        RIGHT
      ) + randomValue(-randomFactor, randomFactor);

      const CHANGED_ROW = y;
      const CHANGED_COLUMN = x;

      matrix[CHANGED_ROW][CHANGED_COLUMN] = result;
    }
  }
}
