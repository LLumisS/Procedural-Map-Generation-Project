export const N = 8;
export const MATRIX_LENGTH = Math.pow(2, N) + 1;

export const MAX_RIVERS_COUNT = 6;
export const RIVERS_WET_RADIUS = 14;
export const MIN_RIVERS_LENGTH = 15;
export const EXTRA_MOISTURE = 1 / 1100;

export const PIXEL_SIZE = 2;

export const RANDOM_RANGE_CORNERS = 40;
export const RANDOM_RANGE_COMMON = 160;
export const GRIT_COEFFICIENT = 4;

export const WATER_LEVEL = 0;
export const HEIGHT_IMPACT = 0.5;
export const DARKNESS_PER_STAGE = 1 / 8;

export const BIOMS = [
  {
    id: 'snowy_peak',
    moisture: 1,
    temperature: -0.5,
    heightFrom: 0.8,
    heightTo: 1,
  },
  {
    id: 'icy_wastelands',
    moisture: -0.5,
    temperature: -0.5,
    heightFrom: 0,
    heightTo: 1,
  },
  {
    id: 'grass_tundra',
    moisture: 0,
    temperature: -0.5,
    heightFrom: 0,
    heightTo: 1,
  },
  {
    id: 'tree_tundra',
    moisture: 0.5,
    temperature: -0.5,
    heightFrom: 0,
    heightTo: 1,
  },
  {
    id: 'beach',
    moisture: 1,
    temperature: 1,
    heightFrom: 0,
    heightTo: 0.025,
  },
  {
    id: 'taiga',
    moisture: 1,
    temperature: -0.5,
    heightFrom: 0,
    heightTo: 1,
  },
  {
    id: 'grass_steppe',
    moisture: -0.5,
    temperature: 0,
    heightFrom: 0,
    heightTo: 1,
  },
  {
    id: 'tree_steppe',
    moisture: 0,
    temperature: 0,
    heightFrom: 0,
    heightTo: 1,
  },
  {
    id: 'forest',
    moisture: 0.5,
    temperature: 0,
    heightFrom: 0,
    heightTo: 1,
  },
  {
    id: 'swamp',
    moisture: 1,
    temperature: 0,
    heightFrom: 0,
    heightTo: 1,
  },
  {
    id: 'semi_desert',
    moisture: -0.5,
    temperature: 0.5,
    heightFrom: 0,
    heightTo: 1,
  },
  {
    id: 'grass_savanna',
    moisture: 0,
    temperature: 0.5,
    heightFrom: 0,
    heightTo: 1,
  },
  {
    id: 'tree_savanna',
    moisture: 0.5,
    temperature: 0.5,
    heightFrom: 0,
    heightTo: 1,
  },
  {
    id: 'tropical_moist_forest',
    moisture: 1,
    temperature: 0.5,
    heightFrom: 0,
    heightTo: 1,
  },
  {
    id: 'desert',
    moisture: -0.5,
    temperature: 1,
    heightFrom: 0,
    heightTo: 1,
  },
  {
    id: 'badlands',
    moisture: 0,
    temperature: 1,
    heightFrom: 0,
    heightTo: 1,
  },
  {
    id: 'tropical_dry_forest',
    moisture: 0.5,
    temperature: 1,
    heightFrom: 0,
    heightTo: 1,
  },
  {
    id: 'jungle',
    moisture: 1,
    temperature: 1,
    heightFrom: 0,
    heightTo: 1,
  },
];

export const LIGHTNESS_TABLE = [
  {
    height: 0.2,
    stage: 0,
  },
  {
    height: 0.4,
    stage: 1,
  },
  {
    height: 0.6,
    stage: 2,
  },
  {
    height: 0.8,
    stage: 3,
  },
  {
    height: 0.9,
    stage: 4,
  },
  {
    height: 1,
    stage: 5,
  },
];

export const FILTERS = {
  DEFAULT: [
    {
      id: 'snowy_peak',
      hue: 0,
      saturation: 0,
      lightness: 100,
    },
    {
      id: 'icy_wastelands',
      hue: 180,
      saturation: 40,
      lightness: 90,
    },
    {
      id: 'grass_tundra',
      hue: 35,
      saturation: 25,
      lightness: 50,
    },
    {
      id: 'tree_tundra',
      hue: 70,
      saturation: 15,
      lightness: 50,
    },
    {
      id: 'beach',
      hue: 60,
      saturation: 100,
      lightness: 85,
    },
    {
      id: 'taiga',
      hue: 140,
      saturation: 60,
      lightness: 30,
    },
    {
      id: 'grass_steppe',
      hue: 50,
      saturation: 30,
      lightness: 50,
    },
    {
      id: 'tree_steppe',
      hue: 80,
      saturation: 30,
      lightness: 50,
    },
    {
      id: 'forest',
      hue: 120,
      saturation: 60,
      lightness: 40,
    },
    {
      id: 'swamp',
      hue: 100,
      saturation: 30,
      lightness: 20,
    },
    {
      id: 'semi_desert',
      hue: 55,
      saturation: 65,
      lightness: 65,
    },
    {
      id: 'grass_savanna',
      hue: 65,
      saturation: 50,
      lightness: 60,
    },
    {
      id: 'tree_savanna',
      hue: 75,
      saturation: 50,
      lightness: 60,
    },
    {
      id: 'tropical_moist_forest',
      hue: 120,
      saturation: 40,
      lightness: 40,
    },
    {
      id: 'desert',
      hue: 60,
      saturation: 100,
      lightness: 85,
    },
    {
      id: 'badlands',
      hue: 30,
      saturation: 50,
      lightness: 50,
    },
    {
      id: 'tropical_dry_forest',
      hue: 100,
      saturation: 15,
      lightness: 40,
    },
    {
      id: 'jungle',
      hue: 120,
      saturation: 85,
      lightness: 20,
    },
  ],

  PHYSICAL: [
    {
      level: -0.9,
      hue: 220,
      saturation: 100,
      lightness: 10,
    },
    {
      level: -0.8,
      hue: 220,
      saturation: 100,
      lightness: 20,
    },
    {
      level: -0.6,
      hue: 220,
      saturation: 100,
      lightness: 30,
    },
    {
      level: -0.4,
      hue: 200,
      saturation: 100,
      lightness: 40,
    },
    {
      level: -0.2,
      hue: 200,
      saturation: 100,
      lightness: 60,
    },
    { //Water Level
      level: 0,
      hue: 200,
      saturation: 100,
      lightness: 80,
    },
    {
      level: 0.2,
      hue: 100,
      saturation: 50,
      lightness: 60,
    },
    {
      level: 0.4,
      hue: 75,
      saturation: 50,
      lightness: 60,
    },
    {
      level: 0.6,
      hue: 60,
      saturation: 50,
      lightness: 70,
    },
    {
      level: 0.8,
      hue: 40,
      saturation: 50,
      lightness: 60,
    },
    {
      level: 0.9,
      hue: 30,
      saturation: 50,
      lightness: 40,
    },
    {
      level: 1,
      hue: 30,
      saturation: 50,
      lightness: 20,
    },
  ],

  MOISTURE: [
    {
      level: -0.75,
      hue: 240,
      saturation: 100,
      lightness: 100,
    },
    { //Extra Dry
      level: -0.5,
      hue: 240,
      saturation: 100,
      lightness: 100,
    },
    {
      level: -0.25,
      hue: 240,
      saturation: 100,
      lightness: 85,
    },
    { //Dry
      level: 0,
      hue: 240,
      saturation: 100,
      lightness: 70,
    },
    {
      level: 0.25,
      hue: 240,
      saturation: 100,
      lightness: 55,
    },
    { // Wet
      level: 0.5,
      hue: 240,
      saturation: 100,
      lightness: 40,
    },
    {
      level: 0.75,
      hue: 240,
      saturation: 100,
      lightness: 25,
    },
    { //Extra Wet
      level: 1,
      hue: 240,
      saturation: 100,
      lightness: 10,
    },
  ],

  TEMPERATURE: [
    {
      level: -0.75,
      hue: 240,
      saturation: 100,
      lightness: 50,
    },
    { //Extra Cold
      level: -0.5,
      hue: 220,
      saturation: 100,
      lightness: 50,
    },
    {
      level: -0.25,
      hue: 195,
      saturation: 100,
      lightness: 50,
    },
    { //Cold
      level: 0,
      hue: 170,
      saturation: 100,
      lightness: 50,
    },
    {
      level: 0.25,
      hue: 60,
      saturation: 100,
      lightness: 50,
    },
    { //Warm
      level: 0.5,
      hue: 40,
      saturation: 100,
      lightness: 50,
    },
    {
      level: 0.75,
      hue: 20,
      saturation: 100,
      lightness: 50,
    },
    { //Extra Warm
      level: 1,
      hue: 0,
      saturation: 100,
      lightness: 50,
    },
  ],
};
