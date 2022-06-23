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

const getSetting = settings => {
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

const bypassing = (
  matrix,
  callback,
  init = {}
) => {
  const initDefault = {
    startY: 0,
    startX: 0,
    endY: matrix.length,
    endX: matrix.length,
    incY: 1,
    incX: 1,
  };
  const keys = Object.keys(initDefault);
  for (const key of keys)
    if(!init[key])
      init[key] = initDefault[key];

  for (let y = init.startY; y < init.endY; y += init.incY)
    for (let x = init.startX; x < init.endX; x += init.incX)
      callback({ y, x });
};
