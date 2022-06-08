'use strict';

function generateMatrix(length, randomRange) {
  const matrix = Array(length).fill(null).map(() => Array(length).fill(0));

  matrix[0][length - 1] = randomValue(-randomRange, randomRange);
  matrix[length - 1][0] = randomValue(-randomRange, randomRange);
  matrix[0][0] = randomValue(-randomRange, randomRange);
  matrix[length - 1][length - 1] = randomValue(-randomRange, randomRange);

  return matrix;
}

function diamondSquare(matrix, randomRange) {
  let chunkSize = matrix.length - 1;

  for (; chunkSize > 1; chunkSize /= 2, randomRange /= 2) {
    stageDiamond(matrix, chunkSize, randomRange);
    stageSquare(matrix, chunkSize, randomRange);
  }

  return matrix;
}

function stageDiamond(matrix, chunkSize, randomRange) {
  const length = matrix.length;

  for (let y = 0; y < length - 1; y += chunkSize) {
    for (let x = 0; x < length - 1; x += chunkSize) {
      const bottomRight = matrix[y + chunkSize] ?
        matrix[y + chunkSize][x + chunkSize] :
        null;
      const bottomLeft = matrix[y + chunkSize] ?
        matrix[y + chunkSize][x] :
        null;
      const topLeft = matrix[y][x];
      const topRight = matrix[y][x + chunkSize];

      const result = averageValue(
        bottomRight,
        bottomLeft,
        topLeft,
        topRight
      ) + randomValue(-randomRange, randomRange);

      const changedRow = y + chunkSize / 2;
      const changedColumn = x + chunkSize / 2;

      matrix[changedRow][changedColumn] = result;
    }
  }
}

function stageSquare(matrix, chunkSize, randomRange) {
  const half = chunkSize / 2;
  const length = matrix.length;

  for (let y = 0; y < length; y += half) {
    for (let x = (y + half) % chunkSize; x < length; x += chunkSize) {
      const bottom = matrix[y + half] ? matrix[y + half][x] : null;
      const top = matrix[y - half] ? matrix[y - half][x] : null;
      const left = matrix[y][x - half];
      const right = matrix[y][x + half];

      const result = averageValue(
        bottom,
        top,
        left,
        right
      ) + randomValue(-randomRange, randomRange);

      const changedRow = y;
      const changedColumn = x;

      matrix[changedRow][changedColumn] = result;
    }
  }
}

const normalizeMatrix = matrix => {
  let max = -Infinity;
  for (const row of matrix)
    for (const value of row)
      max = Math.max(Math.abs(value), max);

  return matrix.map(row => row.map(value => value / max));
};

const randomNormalizedMatrix = () =>
  normalizeMatrix(
    diamondSquare(
      generateMatrix(MATRIX_LENGTH, RANDOM_RANGE_CORNERS),
      RANDOM_RANGE_COMMON
    )
  );

function riversGeneration(heightMap, riverCount) {
  const length = heightMap.length;
  const riverArray = Array(riverCount).fill(null).map(() => Array());

  for (let i = 0; i < riverCount; i++) {
    const y = randomValue(0, length - 1);
    const x = randomValue(0, length - 1);

    if (heightMap[y][x] <= 0) {
      i--;
      continue;
    }

    riverGeneration(heightMap, y, x, riverArray[i]);
  }
}

function riverGeneration(heightMap, y, x, river) {
  let End = false;
  river.push({ y, x });

  while (!End) {
    const neighbours = {
      top: {
        y: y - 1,
        x,
        value: heightMap[y - 1] &&
        !includesTile(river, { y: y - 1, x }) ?
          heightMap[y][x] :
          null,
      },
      bottom: {
        y: y + 1,
        x,
        value: heightMap[y + 1] &&
        !includesTile(river, { y: y + 1, x }) ?
          heightMap[y + 1][x] :
          null,
      },
      left: {
        y,
        x: x - 1,
        value: !includesTile(river, { y, x: x - 1 }) ?
          heightMap[y][x - 1] :
          null,
      },
      right: {
        y,
        x: x + 1,
        value: !includesTile(river, { y, x: x + 1 }) ?
          heightMap[y][x + 1] :
          null
      },
    };

    const min = minValue(
      neighbours.top.value,
      neighbours.bottom.value,
      neighbours.left.value,
      neighbours.right.value);

    if (min <= 0)
      End = true;
    else if (min === Infinity) {
      river = [];
      End = true;
      break;
    }

    const keys = Object.keys(neighbours);
    for (const key of keys)
      if (neighbours[key].value === min) {
        y = neighbours[key].y;
        x = neighbours[key].x;
        break;
      }

    river.push({ y, x });
  }

  for (const tile of river)
    heightMap[tile.y][tile.x] = 0;
}

function extraMoistureByRivers(moistureMap, heightMap) {
  return null;
}

function decreaseTemperatureByHeight(temperatureMap, heightMap) {
  for (let y = 0; y < MATRIX_LENGTH; y++)
    for (let x = 0; x < MATRIX_LENGTH; x++)
      temperatureMap[y][x] -= (heightMap[y][x] > 0) ? (heightMap[y][x] / 2) : 0;

  temperatureMap = normalizeMatrix(temperatureMap);
}

function biomDefinition(heightMap, moistureMap, temperatureMap) {
  const biomMap = Array(MATRIX_LENGTH)
    .fill(null)
    .map(() => Array(MATRIX_LENGTH).fill(0));

  for (let y = 0; y < MATRIX_LENGTH; y++)
    for (let x = 0; x < MATRIX_LENGTH; x++) {
      for (const biom of BIOMS)
        if (moistureMap[y][x] <= biom.moisture &&
        temperatureMap[y][x] <= biom.temperature &&
        heightMap[y][x] > biom.heightFrom &&
        heightMap[y][x] <= biom.heightTo) {
          biomMap[y][x] = biom.identifier;
          break;
        }
    }

  return biomMap;
}
