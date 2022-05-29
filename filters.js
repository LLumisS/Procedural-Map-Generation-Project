'use strict';

const FILTERS = {
  'PHYSICAL': [
    {
      level: -0.9,
      color: 220,
      saturation: 100,
      lightness: 10,
    },
    {
      level: -0.8,
      color: 220,
      saturation: 100,
      lightness: 20,
    },
    {
      level: -0.6,
      color: 220,
      saturation: 100,
      lightness: 30,
    },
    {
      level: -0.4,
      color: 200,
      saturation: 100,
      lightness: 40,
    },
    {
      level: -0.2,
      color: 200,
      saturation: 100,
      lightness: 60,
    },
    { //Water Level
      level: 0,
      color: 200,
      saturation: 100,
      lightness: 80,
    },
    {
      level: 0.2,
      color: 100,
      saturation: 50,
      lightness: 60,
    },
    {
      level: 0.4,
      color: 75,
      saturation: 50,
      lightness: 60,
    },
    {
      level: 0.6,
      color: 60,
      saturation: 50,
      lightness: 70,
    },
    {
      level: 0.8,
      color: 40,
      saturation: 50,
      lightness: 60,
    },
    {
      level: 0.9,
      color: 30,
      saturation: 50,
      lightness: 40,
    },
    {
      level: 1,
      color: 30,
      saturation: 50,
      lightness: 20,
    },
  ],

  'MOISTURE': [
    { //Extra Dry
      level: -0.8,
      color: 240,
      saturation: 100,
      lightness: 100,
    },
    { 
      level: -0.5,
      color: 240,
      saturation: 100,
      lightness: 85,
    },
    { //Dry
      level: -0.2,
      color: 240,
      saturation: 100,
      lightness: 70,
    },
    { 
      level: 0.1,
      color: 240,
      saturation: 100,
      lightness: 55,
    },
    { // Wet
      level: 0.4,
      color: 240,
      saturation: 100,
      lightness: 40,
    },
    { 
      level: 0.7,
      color: 240,
      saturation: 100,
      lightness: 25,
    },
    { //Extra Wet
      level: 1,
      color: 240,
      saturation: 100,
      lightness: 10,
    },
  ],

  'TEMPERATURE': [
    {
      level: -0.75,
      color: 240,
      saturation: 100,
      lightness: 50,
    },
    { //Extra Cold
      level: -0.5,
      color: 220,
      saturation: 100,
      lightness: 50,
    },
    {
      level: -0.25,
      color: 195,
      saturation: 100,
      lightness: 50,
    },
    { //Cold
      level: 0,
      color: 170,
      saturation: 100,
      lightness: 50,
    },
    {
      level: 0.25,
      color: 60,
      saturation: 100,
      lightness: 50,
    },
    { //Warm
      level: 0.5,
      color: 40,
      saturation: 100,
      lightness: 50,
    },
    {
      level: 0.75,
      color: 20,
      saturation: 100,
      lightness: 50,
    },
    { //Extra Warm
      level: 1,
      color: 0,
      saturation: 100,
      lightness: 50,
    },
  ],
};