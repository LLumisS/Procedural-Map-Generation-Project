'use strict';

/*
Diamond-Square Matrix Generation Algorithm
*/

function matrixGen(length, randomRange) {
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
    diamond(matrix, chunkSize, randomRange);
    square(matrix, chunkSize, randomRange);
  }

  return matrix;
}

function diamond(matrix, chunkSize, randomRange) {
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

function square(matrix, chunkSize, randomRange) {
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

const normalize = matrix => {
  let max = -Infinity;
  for (const row of matrix)
    for (const value of row)
      max = Math.max(Math.abs(value), max);

  return matrix.map(row => row.map(value => value / max));
};

const randomMatrix = (grit = 1) =>
  normalize(
    diamondSquare(
      matrixGen(MATRIX_LENGTH, RANDOM_RANGE_CORNERS / grit),
      RANDOM_RANGE_COMMON / grit
    )
  );

/*
Field Tiles Definition Algorithm
*/

function fieldDef(heightMap) {
  const fieldTiles = Array();
  const isField = ({ y, x }) => {
    if (heightMap[y][x] > 0)
      fieldTiles.push({ y, x });
  };

  matrixBypassing(isField, heightMap);

  return fieldTiles;
}

/*
Rivers Generation Algorithm
*/

function riversGen(heightMap, riversCount, fieldTiles) {
  const riversArray = Array(riversCount).fill(null).map(() => Array());

  if (fieldTiles.length > 0)
    for (let i = 0; i < riversCount; i++) {
      const n = random(0, fieldTiles.length - 1);

      const y = fieldTiles[n].y;
      const x = fieldTiles[n].x;

      const river = riversArray[i];
      riverGen(heightMap, { y, x }, river);
      if (river.length < MIN_RIVERS_LENGTH)
        i--;
      else
        for (const tile of river)
          heightMap[tile.y][tile.x] = 0;
    }

  return riversArray;
}

function riverGen(heightMap, { y, x }, river) {
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
      for (const key of keys) {
        const way = ways[key];
        if (way.value === min) {
          y = way.y;
          x = way.x;
          break;
        }
      }
      river.push({ y, x });
    }
  }
}

function waysDef(matrix, { y, x }, river) {
  const ways = {
    top: { y: y - 1, x },
    bottom: { y: y + 1, x },
    left: { y, x: x - 1 },
    right: { y, x: x + 1 },
  };
  const keys = Object.keys(ways);

  const values = [];
  for (const key of keys) {
    const way = ways[key];
    const y = way.y;
    const x = way.x;
    way.value = matrix[y] && !includes(river, { y, x }) ?
      matrix[y][x] :
      null;
    values.push(way.value);
  }

  ways.min = min(...values);

  return ways;
}

/*
Moisture Increasing Algorithm
*/

function riversMoisture(moistureMap, rivers) {
  const riversCount = rivers.length;
  for (let n = 0; n < riversCount; n++) {
    const river = rivers[n];
    riverMoisture(moistureMap, river);
  }
}

function riverMoisture(moistureMap, river) {
  const riverLength = river.length;
  for (let i = 0; i < riverLength; i++) {
    const tile = river[i];
    tileMoisture(moistureMap, tile);
  }
}

function tileMoisture(moistureMap, tile) {
  const extraMoisture = ({ y, x }) => {
    if (moistureMap[y] && !isNaN(moistureMap[y][x]))
      moistureMap[y][x] += EXTRA_MOISTURE;
  };

  for (let radius = 1; radius <= RIVERS_WET_RADIUS; radius++) {
    const startY = tile.y - radius;
    const startX = tile.x - radius;
    const endY = startY + 2 * radius;
    const endX = startX + 2 * radius;

    matrixBypassing(extraMoisture, moistureMap, startY, startX, endY, endX);
  }
}

/*
Temperature Decreasing Algorithm
*/

function coldByHeight(temperatureMap, heightMap) {
  const decrease = ({ y, x }) => {
    temperatureMap[y][x] -= (heightMap[y][x] > 0) ?
      (heightMap[y][x] / 2) :
      0;
  };

  matrixBypassing(decrease, temperatureMap);
}

/*
Biom Map Generation Algorithm
*/

function biomsDef(heightMap, moistureMap, temperatureMap) {
  const biomMap = Array(MATRIX_LENGTH)
    .fill(null)
    .map(() => Array(MATRIX_LENGTH).fill(0));

  const getBiom = ({ y, x }) => {
    for (const biom of BIOMS) {
      const enough = {
        moisture: moistureMap[y][x] <= biom.moisture,
        temperature: temperatureMap[y][x] <= biom.temperature,
        height: heightMap[y][x] > biom.heightFrom &&
          heightMap[y][x] <= biom.heightTo,
      };
      if (enough.moisture && enough.temperature && enough.height) {
        biomMap[y][x] = biom.identifier;
        break;
      }
    }
  };

  matrixBypassing(getBiom, biomMap);

  return biomMap;
}
