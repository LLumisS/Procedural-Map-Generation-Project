'use strict';

const radio = document.getElementsByClassName('class_filter');
const canvas = document.getElementById('map');

const SETTINGS = {
  power: 8,
  pixelSize: 2,
  filter: FILTERS.PHYSICAL_COLORS,
  cornersRandom: 6,
  noiseRandom: 24,
};

const N = SETTINGS.power;
const MATRIX_LENGTH = powerInt(2, N) + 1;

const PIXEL_SIZE = SETTINGS.pixelSize;
canvas.height = MATRIX_LENGTH * PIXEL_SIZE;
canvas.width = MATRIX_LENGTH * PIXEL_SIZE;

const RANDOM_CORNERS = SETTINGS.cornersRandom;
const RANDOM_RANGE = SETTINGS.noiseRandom;

function draw(matrix) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.height, canvas.width);

  ctx.beginPath();
  const filter = filterDefinition(radio);
  const length = matrix.length;
  for (let y = 0; y < length; y++)
    for (let x = 0; x < length; x++) {
      ctx.fillStyle = getColor(matrix[y][x], filter);
      ctx.fillRect(
        x * PIXEL_SIZE,
        y * PIXEL_SIZE,
        PIXEL_SIZE,
        PIXEL_SIZE
      );
    }

  ctx.closePath();
}

function start () {
  const MAP_HEIGHT = randomNormalizedMatrix(
    MATRIX_LENGTH, 
    RANDOM_CORNERS, 
    RANDOM_RANGE
  );

  const MAP_MOISTURE = randomNormalizedMatrix(
    MATRIX_LENGTH, 
    RANDOM_CORNERS, 
    RANDOM_RANGE
  );

  const MAP_TEMPERATURE = randomNormalizedMatrix(
    MATRIX_LENGTH, 
    RANDOM_CORNERS, 
    RANDOM_RANGE
  );
  for(let y = 0; y < MATRIX_LENGTH; y++)
    for (let x = 0; x < MATRIX_LENGTH; x++)
      MAP_TEMPERATURE[y][x] = MAP_TEMPERATURE[y][x] - MAP_HEIGHT[y][x] / 2;

  draw(MAP_HEIGHT);
}

start();

document.getElementById('refresh').addEventListener('click', start);
document.getElementById('apply').addEventListener('click', start);
