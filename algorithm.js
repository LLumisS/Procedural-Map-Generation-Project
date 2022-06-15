'use strict';

function generateMatrix(length, randomRange) {
  const matrix = Array(length).fill(null).map(() => Array(length).fill(0));

  const last = length - 1;
  const corners = {
    topLeft: { x: 0, y: 0 },
    topRight: { x: last, y: 0 },
    bottomLeft: { x: 0, y: last },
    bottomRight: { x: last, y: last },
  };
  const keys = Object.keys(corners);

  for (const key of keys) {
    const x = corners[key].x;
    const y = corners[key].y;
    matrix[y][x] = random(-randomRange, randomRange);
  }

  return matrix;
}

function diamondSquare(matrix, randomRange) {
  let chunkSize = matrix.length - 1;

  for (chunkSize; chunkSize > 1; chunkSize /= 2, randomRange /= 2) {
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

      const result = average(
        bottomRight,
        bottomLeft,
        topLeft,
        topRight
      ) + random(-randomRange, randomRange);

      const changedY = y + chunkSize / 2;
      const changedX = x + chunkSize / 2;

      matrix[changedY][changedX] = result;
    }
  }
}

function stageSquare(matrix, chunkSize, randomRange) {
  const half = chunkSize / 2;
  const length = matrix.length;

  for (let y = 0; y < length; y += half) {
    for (let x = (y + half) % chunkSize; x < length; x += chunkSize) {
      const bottom = matrix[y + half] ?
        matrix[y + half][x] :
        null;
      const top = matrix[y - half] ?
        matrix[y - half][x] :
        null;
      const left = matrix[y][x - half];
      const right = matrix[y][x + half];

      const result = average(
        bottom,
        top,
        left,
        right
      ) + random(-randomRange, randomRange);

      const changedY = y;
      const changedX = x;

      matrix[changedY][changedX] = result;
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

function fieldDef(heightMap) {
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
    const n = random(0, fieldTiles.length - 1);

    const y = fieldTiles[n].y;
    const x = fieldTiles[n].x;

    const river = riversArray[i];
    riverGeneration(heightMap, { y, x }, river);
    if (riversArray[i].length < MIN_RIVERS_LENGTH)
      i--;
    else
      for (const tile of river)
        heightMap[tile.y][tile.x] = 0;
  }

  return riversArray;
}

function riverGeneration(heightMap, { y, x }, river) {
  river.push({ y, x });

  let End = false;
  while (!End) {
    const ways = waysDef(heightMap, { y, x }, river);
    const min = ways.min;

    if (min <= 0) {
      End = true;
    } else if (min === Infinity) {
      river.length = 0;
      End = true;
    } else {
      const keys = Object.keys(ways);
      for (const key of keys)
        if (ways[key].value === min) {
          y = ways[key].y;
          x = ways[key].x;
        }
      river.push({ y, x });
    }
  }
}

function waysDef(matrix, { y, x }, river) {
  const neighbours = {
    top: { y: y - 1, x },
    bottom: { y: y + 1, x },
    left: { y, x: x - 1 },
    right: { y, x: x + 1 },
  };
  const keys = Object.keys(neighbours);

  for (const key of keys) {
    const y = neighbours[key].y;
    const x = neighbours[key].x;
    neighbours[key].value = matrix[y] && !includes(river, { y, x }) ?
      matrix[y][x] :
      null;
  }

  neighbours.min = min(
    neighbours.top.value,
    neighbours.bottom.value,
    neighbours.left.value,
    neighbours.right.value,
  );

  return neighbours;
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
