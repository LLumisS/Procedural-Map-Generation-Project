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

const averageValueMatrix = matrix => {
  let sum = 0;
  const count = powerInt(matrix.length, 2);
  for (const row of matrix)
    for (const value of row)
      sum += value;
  return sum / count;
};

const getColor = (percentage, filter) => {
  for (const layer of filter) {
    if (percentage <= layer.level)
      return `hsl(${layer.color}, ${layer.saturation}%, ${layer.lightness}%)`;
  }
};

const normalizeMatrix = matrix => {
  let max = -Infinity;
  for (const row of matrix)
    for (const value of row)
      max = Math.max(Math.abs(value), max);

  return matrix.map(row => row.map(value => value / max));
}

const randomNormalizedMatrix = (length, cornersRandom, noiseRandom) => 
  normalizeMatrix(
    diamondSquare(
      generateMatrix(length, cornersRandom),
      noiseRandom
    )
  );

const filterDefinition = array => {
  for(let i = 0; i < 4; i++)
    if (array[i].checked)
      return array[i].value;
}

function temperatureMapGenerator(heightMap) {
  const tempratureRandom = randomNormalizedMatrix(
    MATRIX_LENGTH, 
    RANDOM_CORNERS, 
    RANDOM_RANGE
  );

  for(let y = 0; y < MATRIX_LENGTH; y++)
    for (let x = 0; x < MATRIX_LENGTH; x++)
      tempratureRandom[y][x] -= (heightMap[y][x] > 0) ? (heightMap[y][x] / 4) : 0;

  return normalizeMatrix(tempratureRandom);
}