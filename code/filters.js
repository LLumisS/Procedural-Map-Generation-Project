'use strict';

const BIOMS = [
  { //Snowy Peak
    id: 18,
    moisture: 1,
    temperature: -0.5,
    heightFrom: 0.8,
    heightTo: 1,
  },
  { //Icy Wasteland
    id: 1,
    moisture: -0.5,
    temperature: -0.5,
    heightFrom: 0,
    heightTo: 1,
  },
  { //Grass Tundra
    id: 2,
    moisture: 0,
    temperature: -0.5,
    heightFrom: 0,
    heightTo: 1,
  },
  { //Tree Tundra
    id: 3,
    moisture: 0.5,
    temperature: -0.5,
    heightFrom: 0,
    heightTo: 1,
  },
  { //Beach
    id: 17,
    moisture: 1,
    temperature: 1,
    heightFrom: 0,
    heightTo: 0.025,
  },
  { //Taiga
    id: 4,
    moisture: 1,
    temperature: -0.5,
    heightFrom: 0,
    heightTo: 1,
  },
  { //Grass Steppe
    id: 5,
    moisture: -0.5,
    temperature: 0,
    heightFrom: 0,
    heightTo: 1,
  },
  { //Tree Steppe
    id: 6,
    moisture: 0,
    temperature: 0,
    heightFrom: 0,
    heightTo: 1,
  },
  { //Forest
    id: 7,
    moisture: 0.5,
    temperature: 0,
    heightFrom: 0,
    heightTo: 1,
  },
  { //Swamp
    id: 8,
    moisture: 1,
    temperature: 0,
    heightFrom: 0,
    heightTo: 1,
  },
  { //Semi Desert
    id: 9,
    moisture: -0.5,
    temperature: 0.5,
    heightFrom: 0,
    heightTo: 1,
  },
  { //Grass Savanna
    id: 10,
    moisture: 0,
    temperature: 0.5,
    heightFrom: 0,
    heightTo: 1,
  },
  { //Tree Savanna
    id: 11,
    moisture: 0.5,
    temperature: 0.5,
    heightFrom: 0,
    heightTo: 1,
  },
  { //Tropical Moist Forest
    id: 12,
    moisture: 1,
    temperature: 0.5,
    heightFrom: 0,
    heightTo: 1,
  },
  { //Desert
    id: 13,
    moisture: -0.5,
    temperature: 1,
    heightFrom: 0,
    heightTo: 1,
  },
  { //Semi Desert
    id: 14,
    moisture: 0,
    temperature: 1,
    heightFrom: 0,
    heightTo: 1,
  },
  { //Tropical Dry Forest
    id: 15,
    moisture: 0.5,
    temperature: 1,
    heightFrom: 0,
    heightTo: 1,
  },
  { //Jungle
    id: 16,
    moisture: 1,
    temperature: 1,
    heightFrom: 0,
    heightTo: 1,
  },
];

const LIGHTNESS_TABLE = [
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

const FILTERS = {
  DEFAULT: [
    { name: 'Icy Wasteland',
      id: 1,
      hue: 180,
      saturation: 40,
      lightness: 90,
    },
    { name: 'Grass Tundra',
      id: 2,
      hue: 35,
      saturation: 25,
      lightness: 50,
    },
    { name: 'Tree Tundra',
      id: 3,
      hue: 70,
      saturation: 15,
      lightness: 50,
    },
    { name: 'Taiga',
      id: 4,
      hue: 140,
      saturation: 60,
      lightness: 30,
    },
    { name: 'Grass Steppe',
      id: 5,
      hue: 50,
      saturation: 30,
      lightness: 50,
    },
    { name: 'Tree Steppe',
      id: 6,
      hue: 80,
      saturation: 30,
      lightness: 50,
    },
    { name: 'Forest',
      id: 7,
      hue: 120,
      saturation: 60,
      lightness: 40,
    },
    { name: 'Swamp',
      id: 8,
      hue: 100,
      saturation: 30,
      lightness: 20,
    },
    { name: 'Semi Desert',
      id: 9,
      hue: 55,
      saturation: 65,
      lightness: 65,
    },
    { name: 'Grass Savanna',
      id: 10,
      hue: 65,
      saturation: 50,
      lightness: 60,
    },
    { name: 'Tree Savanna',
      id: 11,
      hue: 75,
      saturation: 50,
      lightness: 60,
    },
    { name: 'Tropical Moist Forest',
      id: 12,
      hue: 120,
      saturation: 40,
      lightness: 40,
    },
    { name: 'Desert',
      id: 13,
      hue: 60,
      saturation: 100,
      lightness: 85,
    },
    { name: 'Badlands',
      id: 14,
      hue: 30,
      saturation: 50,
      lightness: 50,
    },
    { name: 'Tropical Dry Forest',
      id: 15,
      hue: 100,
      saturation: 15,
      lightness: 40,
    },
    { name: 'Jungle',
      id: 16,
      hue: 120,
      saturation: 85,
      lightness: 20,
    },
    { name: 'Beach',
      id: 17,
      hue: 60,
      saturation: 100,
      lightness: 85,
    },
    { name: 'Snowy Peak',
      id: 18,
      hue: 0,
      saturation: 0,
      lightness: 100,
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
