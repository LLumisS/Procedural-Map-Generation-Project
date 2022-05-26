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

const getColor = percentage => {
  let color;
  let lightness;
  let saturation;

  if (percentage < 0.0000001) {
    color = 220;
    saturation = 100;
    lightness = 15;
  } else if (percentage < 0.05) {
    color = 220;
    saturation = 100;
    lightness = 25;
  } else if (percentage < 0.2) {
    color = 200;
    saturation = 100;
    lightness = 40;
  } else if (percentage < 0.35) {
    color = 200;
    saturation = 100;
    lightness = 60;
  } else if (percentage < 0.43) {
    color = 200;
    saturation = 100;
    lightness = 80;
  } else if (percentage < 0.5) {
    color = 100;
    saturation = 50;
    lightness = 60;
  } else if (percentage < 0.6) {
    color = 75;
    saturation = 50;
    lightness = 60;
  } else if (percentage < 0.7) {
    color = 60;
    saturation = 50;
    lightness = 70;
  } else if (percentage < 0.8) {
    color = 40;
    saturation = 50;
    lightness = 60;
  } else {
    color = 30;
    saturation = 50;
    lightness = 40;
  }

  return `hsl(${color}, ${saturation}%, ${lightness}%)`;
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
      ctx.fillStyle = getColor(pixel);
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
  ctx.closePath();
}

function generateMatrix(length, randomCorners) {
  const matrix = Array(length).fill(0).map(() => Array(length).fill(null));

  matrix[0][length - 1] = randomValue(0, randomCorners);
  matrix[length - 1][0] = randomValue(0, randomCorners);
  matrix[0][0] = randomValue(0, randomCorners);
  matrix[length - 1][length - 1] = randomValue(0, randomCorners);

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
