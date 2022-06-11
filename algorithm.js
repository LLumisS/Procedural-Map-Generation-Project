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

const randomNormalizedMatrix = (grit = 1) =>
  normalizeMatrix(
    diamondSquare(
      generateMatrix(MATRIX_LENGTH, RANDOM_RANGE_CORNERS / grit),
      RANDOM_RANGE_COMMON / grit
    )
  );

function fieldTilesDefinition(heightMap) {
  const fieldTiles = Array();

  const length = heightMap.length;
  for (let y = 0; y < length; y++)
    for (let x = 0; x < length; x++)
      if (heightMap[y][x] > 0)
        fieldTiles.push({ y, x });

  return fieldTiles;
}

function riversGeneration(heightMap, riversCount, fieldTiles) {
  const riversArray = Array(riversCount).fill(null).map(() => Array());

  for (let i = 0; i < riversCount; i++) {
    const n = randomValue(0, fieldTiles.length - 1);

    const y = fieldTiles[n].y;
    const x = fieldTiles[n].x;

    riverGeneration(heightMap, { y, x }, riversArray[i]);
    if (riversArray[i].length === 0) {
      i--;
    }
  }

  return riversArray;
}

function riverGeneration(heightMap, { y, x }, river) {
  let End = false;
  river.push({ y, x });
  const keys = ['top', 'bottom', 'left', 'right'];

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
      river.length = 0;
      End = true;
      break;
    }

    for (const key of keys)
      if (neighbours[key].value === min) {
        y = neighbours[key].y;
        x = neighbours[key].x;
        break;
      }

    river.push({ y, x });
  }

  if (river.length < MIN_RIVERS_LENGTH)
    river.length = 0;
  else
    for (const tile of river)
      heightMap[tile.y][tile.x] = 0;
}

function extraMoistureByRivers(moistureMap, rivers) {
  const riversCount = rivers.length;
  for (let n = 0; n < riversCount; n++) {
    const riverLength = rivers[n].length;
    for (let i = 0; i < riverLength; i++) {
      const centerY = rivers[n][i].y;
      const centerX = rivers[n][i].x;
      let radius = RIVERS_WET_RADIUS;

      while (radius > 0) {
        const startY = centerY - radius;
        const startX = centerX - radius;

        const endY = startY + 2 * radius;
        const endX = startX + 2 * radius;

        for (let y = startY; y <= endY; y++)
          for (let x = startX; x <= endX; x++)
            if (moistureMap[y] && !isNaN(moistureMap[y][x]))
              moistureMap[y][x] += EXTRA_MOISTURE;

        radius--;
      }
    }
  }
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
