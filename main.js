'use strict';

const util = require('./util');
const algorithm = require('./diamondSquare');

const N = 2;
const RANDOM_RANGE = 10;
const MATRIX_LENGTH = util.powerInt(2, N) + 1;

const MAP = algorithm.generateMatrix(MATRIX_LENGTH, RANDOM_RANGE);
algorithm.diamondSquare(MAP, RANDOM_RANGE);
console.table(MAP);
