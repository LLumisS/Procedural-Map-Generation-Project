'use strict';

const SETTINGS = {
  pixels: 8,
  pixelSize: 2,
  filter: PHYSICAL_COLORS,
  cornersRandom: 60,
  noiseRandom: 60,
};

const N = SETTINGS.pixels;
const MATRIX_LENGTH = powerInt(2, N) + 1;

const PIXEL_SIZE = SETTINGS.pixelSize;
const CANVAS_HEIGHT = MATRIX_LENGTH * PIXEL_SIZE;
const CANVAS_WIDTH = MATRIX_LENGTH * PIXEL_SIZE;

const RANDOM_CORNERS = SETTINGS.cornersRandom;
const RANDOM_RANGE = SETTINGS.noiseRandom;
const FILTER = SETTINGS.filter;

const canvas = document.getElementById('map');
canvas.height = CANVAS_HEIGHT;
canvas.width = CANVAS_WIDTH;

function start() {
  const MAP = normalizeMatrix(
    diamondSquare(
      generateMatrix(MATRIX_LENGTH, RANDOM_CORNERS),
      RANDOM_RANGE
    )
  );

  draw(MAP, FILTER);
}

start();

document.querySelector('button').addEventListener('click', start);
