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

const averageValueMatrix = (matrix) => {
  let sum = 0;
  const count = powerInt(matrix.length, 2);
  for (const row of matrix)
    for (const value of row)
      sum += value;
  return sum / count;
};

const getColor = (percentage, filter) => {
  for (const layer of filter) {
    if (percentage <= layer.level) {
      const color = layer.color;
      const lightness = layer.lightness;
      const saturation = layer.saturation;

      const result = `hsl(${color}, ${saturation}%, ${lightness}%)`;
      return result;
    }
  }
};

function normalizeMatrix(matrix) {
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

const filterDefinition = (array) => {
  for(let i = 0; i < 4; i++)
  if (array[i].checked) {
    return FILTERS[array[i].value];
  }
}