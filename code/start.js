'use strict';

const radioFilter = document.getElementsByClassName('radio_filter');
const canvas = document.getElementById('map');
const table = document.getElementById('table');

const N = 8;
const MATRIX_LENGTH = Math.pow(2, N) + 1;

const MAX_RIVERS_COUNT = 6;
const RIVERS_WET_RADIUS = 14;
const MIN_RIVERS_LENGTH = 15;
const EXTRA_MOISTURE = 1 / 1100;

const PIXEL_SIZE = 2;
canvas.height = MATRIX_LENGTH * PIXEL_SIZE;
canvas.width = MATRIX_LENGTH * PIXEL_SIZE;

const RANDOM_RANGE_CORNERS = 40;
const RANDOM_RANGE_COMMON = 160;
const GRIT_COEFFICIENT = 4;

const WATER_LEVEL = 0;
const HEIGHT_IMPACT = 0.5;
const DARKNESS_PER_STAGE = 1 / 8;

const MAP = {
  'PHYSICAL': null,
  'MOISTURE': null,
  'TEMPERATURE': null,
  'DEFAULT': null,
};

function create() {
  const heightMap = new HeightMap(FILTERS.PHYSICAL);
  const moistureMap = new MoistureMap(
    FILTERS.MOISTURE,
    heightMap.rivers
  );
  const temperatureMap = new TemperatureMap(
    FILTERS.TEMPERATURE,
    heightMap.matrix
  );
  heightMap.digRivers();
  const defaultMap = new BiomMap(
    FILTERS.DEFAULT,
    FILTERS.PHYSICAL,
    heightMap.matrix,
    moistureMap.matrix,
    temperatureMap.matrix
  );

  MAP['PHYSICAL'] = heightMap;
  MAP['MOISTURE'] = moistureMap;
  MAP['TEMPERATURE'] = temperatureMap;
  MAP['DEFAULT'] = defaultMap;

  apply();
}

function apply() {
  const setting = getSetting(radioFilter);
  const map = MAP[setting];

  table.style.visibility = setting !== 'DEFAULT' ?
    'hidden' :
    'visible';

  map.draw();
}

create();

document.getElementById('refresh').addEventListener('click', create);
document.getElementById('apply').addEventListener('click', apply);
