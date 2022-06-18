'use strict';

const random = (min, max) => Math.floor(Math.random() * (max - min + 1) + min);

const average = (...argArray) => {
  let sum = 0;
  let count = 0;
  for (const arg of argArray)
    if (!isNaN(arg) && arg !== null) {
      sum += arg;
      count++;
    }
  return sum / count;
};

const settingDef = settings => {
  for (const setting of settings)
    if (setting.checked)
      return setting.value;
};

const min = (...argArray) => {
  let min = Infinity;
  for (const arg of argArray)
    if (!isNaN(arg) && arg !== null)
      min = min > arg ?
        arg :
        min;

  return min;
};

const includes = (array, tile) => {
  for (const pixel of array)
    if (pixel.y === tile.y && pixel.x === tile.x)
      return true;
  return false;
};

function averageRandom(matrix, elements, randomRange) {
  const values = [];
  for (const elem of elements) {
    const x = elem.x;
    const y = elem.y;
    elem.value = matrix[y] ?
      matrix[y][x] :
      null;
    values.push(elem.value);
  }

  return average(...values) + random(-randomRange, randomRange);
}

/*
Color Definition Algorithm
*/

const color = (percentage, filter) => {
  for (const layer of filter) {
    if (percentage <= layer.level)
      return `hsl(${layer.hue}, ${layer.saturation}%, ${layer.lightness}%)`;
  }
};

const getLightness = (
  heightPercentage,
  lightnessTable,
  biom
) => {
  let stage;
  for (const level of lightnessTable)
    if (heightPercentage <= level.height) {
      stage = level.stage;
      break;
    }
  const change = (1 - DARKNESS_PER_STAGE * stage);
  return biom.lightness * change;
};

const biomColor = (
  biomPercentage,
  heightPercentage,
  biomFilter,
  lightnessTable
) => {
  for (const biom of biomFilter)
    if (biomPercentage <= biom.identifier) {
      const lightness = getLightness(heightPercentage, lightnessTable, biom);
      return `hsl(${biom.hue}, ${biom.saturation}%, ${lightness}%)`;
    }
};

/*
Matrix Bypassing Algorithm
*/

const matrixBypassing = (
  callback,
  matrix,
  startY = 0,
  startX = 0,
  endY = matrix.length,
  endX = matrix.length,
) => {
  for (let y = startY; y < endY; y++)
    for (let x = startX; x < endX; x++)
      callback({ y, x });
};
