'use strict';

/*
Diamond-Square Matrix Generation Algorithm
*/

function matrixGen(length, randomRange) {
  const matrix = Array(length).fill(null).map(() => Array(length).fill(0));

  const last = length - 1;
  const corners = [
    { x: 0, y: 0 },
    { x: last, y: 0 },
    { x: 0, y: last },
    { x: last, y: last },
  ];

  for (const corner of corners) {
    const x = corner.x;
    const y = corner.y;
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

function averageRandom(matrix, elements, randomRange) {
  const values = [];
  for (const elem of elements) {
    const x = elem.x;
    const y = elem.y;
    elem.value = matrix[y] ?
      matrix[y][x] :
      null;
    values.push(elem.value);
  }

  return average(...values) + random(-randomRange, randomRange);
}

function diamond(matrix, chunkSize, randomRange) {
  const length = matrix.length;

  for (let y = 0; y < length - 1; y += chunkSize) {
    for (let x = 0; x < length - 1; x += chunkSize) {
      const chunkCorners = [
        { x, y },
        { x, y: y + chunkSize },
        { x: x + chunkSize, y },
        { x: x + chunkSize, y: y + chunkSize },
      ];

      const result = averageRandom(matrix, chunkCorners, randomRange);

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
      const chunkSides = [
        { x, y: y - half },
        { x, y: y + half },
        { x: x + half, y },
        { x: x - half, y },
      ];

      const result = averageRandom(matrix, chunkSides, randomRange);

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

      const sourse = {
        y: fieldTiles[n].y,
        x: fieldTiles[n].x,
      };

      const river = riversArray[i];
      riverGen(heightMap, sourse, river);
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
  const ways = [
    { y: y - 1, x },
    { y: y + 1, x },
    { y, x: x - 1 },
    { y, x: x + 1 },
  ];

  const values = [];
  for (const way of ways) {
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
