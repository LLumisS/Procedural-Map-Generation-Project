'use strict';

const BIOMS = [
  { //Tundra
    level: 1,
    moisture: 0,
    temperature: -0.5, 
  },
  { //Taiga
    level: 2,
    moisture: 1,
    temperature: -0.5,
  },
  { //Step`
    level: 3,
    moisture: -0.5,
    temperature: 0.5,
  },
  { //Lyg
    level: 4,
    moisture: 0,
    temperature: 0.5,
  },
  { //Sosna
    level: 5,
    moisture: 1,
    temperature: 0,
  },
  { //Forest
    level: 6,
    moisture: 1,
    temperature: 0.5,
  },
  { //Desert
    level: 7,
    moisture: -0.5,
    temperature: 1,
  },
  { //Pustosh
    level: 8,
    moisture: 0,
    temperature: 1,
  },
  { //Savanna
    level: 9,
    moisture: 1,
    temperature: 0.5,
  },
  { //Jungle
    level: 10,
    moisture: 1,
    temperature: 1,
  },
];

const FILTERS = {
  'DEFAULT': [
    {
      level: 1,
      hue: 0,
      saturation: 0,
      lightness: 0,
    },
    {
      level: 2,
      hue: 0,
      saturation: 0,
      lightness: 0,
    },
    {
      level: 3,
      hue: 0,
      saturation: 0,
      lightness: 0,
    },
    {
      level: 4,
      hue: 0,
      saturation: 0,
      lightness: 0,
    },
    {
      level: 5,
      hue: 0,
      saturation: 0,
      lightness: 0,
    },
    {
      level: 6,
      hue: 0,
      saturation: 0,
      lightness: 0,
    },
    {
      level: 7,
      hue: 0,
      saturation: 0,
      lightness: 0,
    },
    {
      level: 8,
      hue: 0,
      saturation: 0,
      lightness: 0,
    },
    {
      level: 9,
      hue: 0,
      saturation: 0,
      lightness: 0,
    },
    {
      level: 10,
      hue: 0,
      saturation: 0,
      lightness: 0,
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