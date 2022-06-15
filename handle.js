'use strict';

const random = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

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

const getColor = (percentage, filter) => {
  for (const layer of filter) {
    if (percentage <= layer.level)
      return `hsl(${layer.hue}, ${layer.saturation}%, ${layer.lightness}%)`;
  }
};

const settingDefinition = settings => {
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

const getBiomColor = (biomPercentage,
  heightPercentage,
  biomFilter,
  lightnessTable) => {
  let coefficient;
  for (const layer of biomFilter) {
    if (biomPercentage <= layer.level) {
      for (const level of lightnessTable)
        if (heightPercentage <= level.height) {
          coefficient = level.coefficient;
          break;
        }
      const lightness = layer.lightness * (1 - 1 / 8 * coefficient);
      return `hsl(${layer.hue}, ${layer.saturation}%, ${lightness}%)`;
    }
  }
};
