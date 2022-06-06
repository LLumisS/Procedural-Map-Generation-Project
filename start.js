'use strict';

const radio = document.getElementsByClassName('class_filter');
const canvas = document.getElementById('map');

const N = 8;
const MATRIX_LENGTH = powerInt(2, N) + 1;
const RIVERS_COUNT = 10;

const PIXEL_SIZE = 2;
canvas.height = MATRIX_LENGTH * PIXEL_SIZE;
canvas.width = MATRIX_LENGTH * PIXEL_SIZE;

const RANDOM_RANGE_CORNERS = 20;
const RANDOM_RANGE_COMMON = 80;

const MAP = {
  'PHYSICAL': null,
  'MOISTURE': null,
  'TEMPERATURE': null,
  'DEFAULT': null,
};

function start() {
  const heightMap = new HeightMap(FILTERS.PHYSICAL);
  const moistureMap = new MoistureMap(FILTERS.MOISTURE, heightMap.matrix);
  const temperatureMap = new TemperatureMap(
    FILTERS.TEMPERATURE,
    heightMap.matrix);
  const defaultMap = new BiomMap(
    FILTERS.DEFAULT,
    moistureMap.matrix,
    temperatureMap.matrix,
    heightMap.matrix);

  MAP['PHYSICAL'] = heightMap;
  MAP['MOISTURE'] = moistureMap;
  MAP['TEMPERATURE'] = temperatureMap;
  MAP['DEFAULT'] = defaultMap;

  apply();
}

function apply() {
  const setting = settingDefinition(radio);
  const map = MAP[setting];

  if (!map.isCash)
    map.draw();
  else
    map.drawFromCash();
}

start();

document.getElementById('refresh').addEventListener('click', start);
document.getElementById('apply').addEventListener('click', apply);
