'use strict';

const BIOMS = [
  { //Icy Wasteland
    level: 1,
    moisture: -0.5,
    temperature: -0.5,
  },
  { //Snowy Tundra
    level: 2,
    moisture: 0,
    temperature: -0.5,
  },
  { //Snowy Forest-Tundra
    level: 3,
    moisture: 0.5,
    temperature: -0.5,
  },
  { //Snowy Taiga
    level: 4,
    moisture: 1,
    temperature: -0.5,
  },
  { //Tundra
    level: 5,
    moisture: -0.5,
    temperature: 0,
  },
  { //Forest-Steppe
    level: 6,
    moisture: 0,
    temperature: 0,
  },
  { //Forest
    level: 7,
    moisture: 0.5,
    temperature: 0,
  },
  { //Taiga
    level: 8,
    moisture: 1,
    temperature: 0,
  },
  { //Plains
    level: 9,
    moisture: -0.5,
    temperature: 0.5,
  },
  { //Savanna
    level: 10,
    moisture: 0,
    temperature: 0.5,
  },
  { //Forest-Savanna
    level: 11,
    moisture: 0.5,
    temperature: 0.5,
  },
  { //Swamp
    level: 12,
    moisture: 1,
    temperature: 0.5,
  },
  { //Desert
    level: 13,
    moisture: -0.5,
    temperature: 1,
  },
  { //Badlands
    level: 14,
    moisture: 0,
    temperature: 1,
  },
  { //Tropical Forest
    level: 15,
    moisture: 0.5,
    temperature: 1,
  },
  { //Jungle
    level: 16,
    moisture: 1,
    temperature: 1,
  },
];

const LIGHTNESS_TABLE = [
  {
    height: 0.2,
    coefficient: 0,
  },
  {
    height: 0.4,
    coefficient: 1,
  },
  {
    height: 0.6,
    coefficient: 2,
  },
  {
    height: 0.8,
    coefficient: 3,
  },
  {
    height: 0.9,
    coefficient: 4,
  },
  {
    height: 1,
    coefficient: 5,
  },
];

const FILTERS = {
  'DEFAULT': [
    { //Icy Wasteland
      level: 1,
      hue: 180,
      saturation: 80,
      lightness: 90,
    },
    { //Snowy Tundra
      level: 2,
      hue: 35,
      saturation: 15,
      lightness: 50,
    },
    { //Snowy Forest-Tundra
      level: 3,
      hue: 70,
      saturation: 15,
      lightness: 50,
    },
    { //Snowy Taiga
      level: 4,
      hue: 0,
      saturation: 0,
      lightness: 100,
    },
    { //Tundra
      level: 5,
      hue: 35,
      saturation: 25,
      lightness: 50,
    },
    { //Forest-Steppe
      level: 6,
      hue: 80,
      saturation: 60,
      lightness: 50,
    },
    { //Forest
      level: 7,
      hue: 120,
      saturation: 60,
      lightness: 40,
    },
    { //Taiga
      level: 8,
      hue: 140,
      saturation: 60,
      lightness: 30,
    },
    { //Plains
      level: 9,
      hue: 50,
      saturation: 80,
      lightness: 60,
    },
    { //Savanna
      level: 10,
      hue: 65,
      saturation: 50,
      lightness: 60,
    },
    { //Forest-Savanna
      level: 11,
      hue: 75,
      saturation: 50,
      lightness: 60,
    },
    { //Swamp
      level: 12,
      hue: 100,
      saturation: 30,
      lightness: 30,
    },
    { //Desert
      level: 13,
      hue: 50,
      saturation: 80,
      lightness: 80,
    },
    { //Badlands
      level: 14,
      hue: 40,
      saturation: 50,
      lightness: 60,
    },
    { //Tropical Forest
      level: 15,
      hue: 120,
      saturation: 80,
      lightness: 50,
    },
    { //Jungle
      level: 16,
      hue: 120,
      saturation: 60,
      lightness: 50,
    },
    { //Beach
      level: 17,
      hue: 60,
      saturation: 90,
      lightness: 50,
    },
  ],

  'PHYSICAL': [
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

  'MOISTURE': [
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

  'TEMPERATURE': [
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
