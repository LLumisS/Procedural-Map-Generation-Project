'use strict';

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
  biomId,
  heightPercentage,
  biomFilter,
  lightnessTable
) => {
  for (const biom of biomFilter)
    if (biomId === biom.id) {
      const lightness = getLightness(heightPercentage, lightnessTable, biom);
      return `hsl(${biom.hue}, ${biom.saturation}%, ${lightness}%)`;
    }
};
