'use strict';

exports.powerInt = (value, power) => {
  let result = 1;
  for (let i = 0; i < power; i++)
    result *= value;
  return result;
};

exports.randomValue = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

exports.averageValue = argArray => {
  let sum = 0;
  let count = 0;
  for (const arg of argArray)
    if (isFinite(arg) && arg !== null) {
      sum += arg;
      count++;
    }
  return sum / count;
};
