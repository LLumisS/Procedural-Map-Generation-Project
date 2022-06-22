'use strict';

function matrix(length, randomRange) {
  const matrix = Array(length).fill(null).map(() => Array(length).fill(0));

  const last = length - 1;
  const corners = [
    { x: 0, y: 0 },
    { x: last, y: 0 },
    { x: 0, y: last },
    { x: last, y: last },
  ];

  for (const corner of corners) {
    const x = corner.x;
    const y = corner.y;
    matrix[y][x] = random(-randomRange, randomRange);
  }

  return matrix;
}

function diamondSquare(matrix, randomRange) {
  let chunkSize = matrix.length - 1;
  for (chunkSize; chunkSize > 1; chunkSize /= 2, randomRange /= 2) {
    diamond(matrix, chunkSize, randomRange);
    square(matrix, chunkSize, randomRange);
  }

  return matrix;
}

function diamond(matrix, chunkSize, randomRange) {
  const half = chunkSize / 2;
  const length = matrix.length;

  for (let y = 0; y < length - 1; y += chunkSize) {
    for (let x = 0; x < length - 1; x += chunkSize) {
      const chunkCorners = [
        { x, y },
        { x, y: y + chunkSize },
        { x: x + chunkSize, y },
        { x: x + chunkSize, y: y + chunkSize },
      ];

      const result = averageRandom(matrix, chunkCorners, randomRange);

      const changedY = y + half;
      const changedX = x + half;

      matrix[changedY][changedX] = result;
    }
  }
}

function square(matrix, chunkSize, randomRange) {
  const half = chunkSize / 2;
  const length = matrix.length;

  for (let y = 0; y < length; y += half) {
    for (let x = (y + half) % chunkSize; x < length; x += chunkSize) {
      const chunkSides = [
        { x, y: y - half },
        { x, y: y + half },
        { x: x + half, y },
        { x: x - half, y },
      ];

      const result = averageRandom(matrix, chunkSides, randomRange);

      const changedY = y;
      const changedX = x;

      matrix[changedY][changedX] = result;
    }
  }
}

const normalize = matrix => {
  let max = -Infinity;
  for (const row of matrix)
    for (const value of row)
      max = Math.max(Math.abs(value), max);

  return matrix.map(row => row.map(value => value / max));
};

const randomMatrix = (grit = 1) =>
  normalize(
    diamondSquare(
      matrix(MATRIX_LENGTH, RANDOM_RANGE_CORNERS / grit),
      RANDOM_RANGE_COMMON / grit
    )
  );
