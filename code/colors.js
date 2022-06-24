'use strict';

const darkening = (
  height,
  lightnessTable,
) => {
  let stage;
  for (const level of lightnessTable)
    if (height <= level.height) {
      stage = level.stage;
      break;
    }
  const change = (1 - DARKNESS_PER_STAGE * stage);
  return change;
};

const color = (percentage, filter) => {
  for (const layer of filter)
    if (percentage <= layer.level)
      return `hsl(${layer.hue}, ${layer.saturation}%, ${layer.lightness}%)`;
};

const biomColor = (
  biomId,
  height,
  biomFilter,
  lightnessTable
) => {
  for (const biom of biomFilter)
    if (biomId === biom.id) {
      const lightness = biom.lightness * darkening(height, lightnessTable);
      return `hsl(${biom.hue}, ${biom.saturation}%, ${lightness}%)`;
    }
};
