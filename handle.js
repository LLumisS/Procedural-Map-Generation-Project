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

const settingDefinition = array => {
  for(const part of array)
    if (part.checked)
      return part.value;
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

const getBiomColor = (biomPercentage, 
  heightPercentage, 
  biomFilter, 
  lightnessTable) => {
  let coeff = 0;
  for (const layer of biomFilter) {
    if (biomPercentage <= layer.level) {
      for (const level of lightnessTable)
        if (heightPercentage <= level.height) {
          coeff = level.coefficient;
          break;
        }
      const lightness = layer.lightness * (1 - 1 / 6 * coeff);
      return `hsl(${layer.hue}, ${layer.saturation}%, ${lightness}%)`;
    }
  }
};