'use strict';

const util = require('./util');

exports.generateMatrix = function(length, randomRange) {
  const matrix = new Array(length)
    .fill(0)
    .map(() => new Array(length).fill(null));

  matrix[0][length - 1] = util.randomValue(0, randomRange);
  matrix[length - 1][0] = util.randomValue(0, randomRange);
  matrix[0][0] = util.randomValue(0, randomRange);
  matrix[length - 1][length - 1] = util.randomValue(0, randomRange);

  return matrix;
};

function stageDiamond(matrix, chunkSize, randomFactor) {
  const length = matrix.length;
  for (let x = 0; x < length - 1; x += chunkSize) {
    for (let y = 0; y < length - 1; y += chunkSize) {
      const BOTTOM_RIGHT = matrix[y + chunkSize] ?
        matrix[y + chunkSize][x + chunkSize] :
        null;
      const BOTTOM_LEFT = matrix[y + chunkSize] ?
        matrix[y + chunkSize][x] :
        null;
      const TOP_LEFT = matrix[y][x];
      const TOP_RIGHT = matrix[y][x + chunkSize];

      const result = util.averageValue([
        BOTTOM_RIGHT,
        BOTTOM_LEFT,
        TOP_LEFT,
        TOP_RIGHT,
      ]) +
        util.randomValue(-randomFactor, randomFactor);

      const CHANGED_ROW = y + chunkSize / 2;
      const CHANGED_COLUMN = x + chunkSize / 2;

      matrix[CHANGED_ROW][CHANGED_COLUMN] = result;
    }
  }
  return matrix;
}

function stageSquare(matrix, chunkSize, randomFactor) {
  const half = chunkSize / 2;
  const length = matrix.length;
  for (let y = 0; y < length; y += half) {
    for (let x = (y + half) % chunkSize; x < length; x += chunkSize) {
      const BOTTOM = matrix[y + half] ? matrix[y + half][x] : null;
      const LEFT = matrix[y][x - half];
      const TOP = matrix[y - half] ? matrix[y - half][x] : null;
      const RIGHT = matrix[y][x + half];

      const result = util.averageValue([
        BOTTOM,
        LEFT,
        TOP,
        RIGHT,
      ]) +
        util.randomValue(-randomFactor, randomFactor);

      const CHANGED_ROW = y;
      const CHANGED_COLUMN = x;

      matrix[CHANGED_ROW][CHANGED_COLUMN] = result;
    }
  }
  return matrix;
}

exports.diamondSquare = function(matrix, randomFactor) {
  let chunkSize = matrix.length - 1;

  for (; chunkSize > 1; chunkSize /= 2, randomFactor /= 2) {
    stageSquare(matrix, chunkSize, randomFactor);
    stageDiamond(matrix, chunkSize, randomFactor);
  }

  return matrix;
};
