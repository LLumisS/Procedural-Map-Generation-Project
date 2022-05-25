'use strict';

const powerInt = (value, power) => {
  let result = 1;
  for (let i = 0; i < power; i++)
    result *= value;
  return result;
};

const randomValue = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

const averageValue = (...argArray) => {
  let sum = 0;
  let count = 0;
  for (const arg of argArray)
    if (isFinite(arg) && arg !== null) {
      sum += arg;
      count++;
    }
  return sum / count;
};

const N = 8;
const MATRIX_LENGTH = powerInt(2, N) + 1;

const PIXEL_SIZE = 2;
const CANVAS_HEIGHT = MATRIX_LENGTH * PIXEL_SIZE;
const CANVAS_WIDTH = MATRIX_LENGTH * PIXEL_SIZE;

const canvas = document.getElementById('map');
canvas.height = CANVAS_HEIGHT;
canvas.width = CANVAS_WIDTH;

const RANDOM_CORNERS = 50;
const RANDOM_RANGE = 50;


const lightness = 100;
const saturation = 50;
const getColor = (percentage, lightness, saturation) =>
  `hsl(${percentage * 360}, ${lightness}%, ${saturation}%)`;

function draw(matrix) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, CANVAS_HEIGHT, CANVAS_WIDTH);

  ctx.beginPath();

  let y;
  let x;

  y = 0;
  for (const row of matrix) {
    x = 0;
    for (const pixel of row) {
      ctx.fillStyle = getColor(pixel, lightness, saturation);
      ctx.fillRect(
        x * PIXEL_SIZE,
        y * PIXEL_SIZE,
        PIXEL_SIZE,
        PIXEL_SIZE,
      );
      x++;
    }
    y++;
  }
}

function generateMatrix(length, randomRange) {
  const matrix = Array(length).fill(0).map(() => Array(length).fill(null));

  matrix[0][length - 1] = randomValue(0, randomRange);
  matrix[length - 1][0] = randomValue(0, randomRange);
  matrix[0][0] = randomValue(0, randomRange);
  matrix[length - 1][length - 1] = randomValue(0, randomRange);

  return matrix;
}

function diamondSquare(matrix, randomRange) {
  let chunkSize = matrix.length - 1;
  let randomFactor = randomRange;

  for (; chunkSize > 1; chunkSize /= 2, randomFactor /= 2) {
    stageDiamond(matrix, chunkSize, randomFactor);
    stageSquare(matrix, chunkSize, randomFactor);
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
        TOP_RIGHT,
      ) +
        randomValue(-randomFactor, randomFactor);

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
      const TOP = matrix[y - half] ? matrix[y - half][x] : null;
      const LEFT = matrix[y][x - half];
      const RIGHT = matrix[y][x + half];

      const result = averageValue(
        BOTTOM,
        TOP,
        LEFT,
        RIGHT,
      ) +
        randomValue(-randomFactor, randomFactor);

      const CHANGED_ROW = y;
      const CHANGED_COLUMN = x;

      matrix[CHANGED_ROW][CHANGED_COLUMN] = result;
    }
  }
  return matrix;
}

function normalizeMatrix(matrix) {
  let max = -Infinity;
  for (const row of matrix)
    for (const value of row)
      max = Math.max(value, max);

  return matrix.map(row => row.map(value => value / max));
}

function start() {
  const MAP = normalizeMatrix(
    diamondSquare(
      generateMatrix(MATRIX_LENGTH, RANDOM_CORNERS),
      RANDOM_RANGE
    )
  );

  draw(MAP);
}

start();

document.querySelector('button').addEventListener('click', start);
