'use strict';

const radio = document.getElementsByClassName('class_filter');
const canvas = document.getElementById('map');

const N = 8;
const MATRIX_LENGTH = powerInt(2, N) + 1;

const PIXEL_SIZE = 2;
canvas.height = MATRIX_LENGTH * PIXEL_SIZE;
canvas.width = MATRIX_LENGTH * PIXEL_SIZE;

const RANDOM_CORNERS = 6;
const RANDOM_RANGE = 24;

const MAP = {
  'DEFAULT': null,
  'PHYSICAL': null,
  'MOISTURE': null,
  'TEMPERATURE': null,
};

function draw(matrix = MAP['PHYSICAL'], filter = FILTERS['PHYSICAL']) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.height, canvas.width);

  ctx.beginPath();
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

function start() {
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

  const MAP_TEMPERATURE = temperatureMapGenerator(MAP_HEIGHT);

  MAP['PHYSICAL'] = MAP_HEIGHT;
  MAP['MOISTURE'] = MAP_MOISTURE;
  MAP['TEMPERATURE'] = MAP_TEMPERATURE;

  draw();
}

function optional() {
  const selected = filterDefinition(radio);

  const filter = FILTERS[selected];
  const map = MAP[selected];

  draw(map, filter);
}

start();

document.getElementById('refresh').addEventListener('click', start);
document.getElementById('apply').addEventListener('click', optional);
