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

const getColor = (percentage, filter) => {
  for (const layer of filter) {
    if (percentage <= layer.level)
      return `hsl(${layer.hue}, ${layer.saturation}%, ${layer.lightness}%)`;
  }
};

const normalizeMatrix = matrix => {
  let max = -Infinity;
  for (const row of matrix)
    for (const value of row)
      max = Math.max(Math.abs(value), max);

  return matrix.map(row => row.map(value => value / max));
};

const randomNormalizedMatrix = () => 
  normalizeMatrix(
    diamondSquare(
      generateMatrix(MATRIX_LENGTH, RANDOM_CORNERS),
      RANDOM_RANGE
    )
  );

const filterDefinition = array => {
  for(let i = 0; i < 4; i++)
    if (array[i].checked)
      return array[i].value;
};

function temperatureMapGenerator(heightMap) {
  const tempratureRandom = randomNormalizedMatrix();

  for(let y = 0; y < MATRIX_LENGTH; y++)
    for (let x = 0; x < MATRIX_LENGTH; x++)
      tempratureRandom[y][x] -= (heightMap[y][x] > 0) ? (heightMap[y][x] / 4) : 0;

  return normalizeMatrix(tempratureRandom);
}

const biomMapGenerator = (moistureMap, temperatureMap, bioms = BIOMS) => {
  const length = moistureMap.length;
  const biomMap = Array(length).fill(null).map(() => Array(length).fill(0));

  for(let y = 0; y < length; y++)
    for(let x = 0; x < length; x++)
      for(const biom of bioms)
        if(moistureMap[y][x] <= biom.moisture && temperatureMap[y][x] <= biom.temperature)
          biomMap[y][x] = biom.level;

  return biomMap;
};

const minValue = (...argArray) => {
  let min = Infinity;
  for (const arg of argArray)
    if (isFinite(arg) && arg !== null)
      min = min > arg ? arg : min;
  return min;
};

const includesTile = (array, tile) => {
  let result = false;
  for (const pixel of array)
    if(pixel.y === tile.y && pixel.x === tile.x)
      return true;
  return result;
}

function riversGeneration(heightMap, riverCount) {
  const length = heightMap.length
  const riverArray = Array(riverCount).fill(null).map(() => Array());

  for(let i = 0; i < riverCount; i++) {
    let y = randomValue(0, length - 1);
    let x = randomValue(0, length - 1);

    if(heightMap[y][x] <= 0) {
      i--;
      continue;
    }

    riverGeneration(heightMap, y, x, riverArray[i]);
  }
}

function riverGeneration(heightMap, y, x , river) {
  let End = false;
  river.push({ y: y, x: x });

  while(!End) {
    const top = heightMap[y - 1] && !includesTile(river, { y: y - 1, x: x }) ? heightMap[y - 1][x] : null;
    const bottom = heightMap[y + 1] && !includesTile(river, { y: y + 1, x: x }) ? heightMap[y + 1][x] : null;
    const left = !includesTile(river, { y: y, x: x - 1 }) ? heightMap[y][x - 1] : null;
    const right = !includesTile(river, { y: y, x: x + 1 }) ? heightMap[y][x + 1] : null;

    const min = minValue(top, bottom, left, right);

    if(min <= 0)
      End = true;
    else if(min === top)
      y += -1;
    else if (min === bottom)
      y += 1;
    else if (min === left)
      x += -1;
    else if (min === right)
      x += 1;
    else if (min === Infinity) {
      river = [];
      End = true;
      break;
    } 

    river.push({ y: y, x: x });
  }

  for(const tile of river)
    heightMap[tile.y][tile.x] = 0;
}

function extraMoistureByRivers(heightMap, moistureMap) {
  return null;
}