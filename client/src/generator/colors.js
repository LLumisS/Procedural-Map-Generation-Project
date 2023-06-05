import { DARKNESS_PER_STAGE } from './consts';

const darkening = (height, lightnessTable) => {
  let stage = 0;
  for (const level of lightnessTable)
    if (height <= level.height) {
      stage = level.stage;
      const change = (1 - DARKNESS_PER_STAGE * stage);
      return change;
    }
};

export const color = (percentage, filter) => {
  for (const layer of filter)
    if (percentage <= layer.level)
      return `hsl(${layer.hue}, ${layer.saturation}%, ${layer.lightness}%)`;
};

export const biomColor = (biomId, biomFilter, height, lightnessTable) => {
  for (const biom of biomFilter)
    if (biomId === biom.id) {
      const lightness = biom.lightness * darkening(height, lightnessTable);
      return `hsl(${biom.hue}, ${biom.saturation}%, ${lightness}%)`;
    }
};
