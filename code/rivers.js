'use strict';

function getRivers(heightMap, riversCount, fieldTiles) {
  const riversArray = Array(riversCount).fill(null).map(() => Array());

  if (fieldTiles.length > 0)
    for (let i = 0; i < riversCount; i++) {
      const n = random(0, fieldTiles.length - 1);

      const sourse = {
        y: fieldTiles[n].y,
        x: fieldTiles[n].x,
      };

      const river = riversArray[i];
      getRiver(heightMap, sourse, river);
      if (river.length < MIN_RIVERS_LENGTH)
        i--;
    }

  return riversArray;
}

function getRiver(heightMap, { y, x }, river) {
  let End = false;
  while (!End) {
    const ways = getWays(heightMap, { y, x }, river);
    const min = ways.min;

    if (min <= WATER_LEVEL) {
      End = true;
    } else if (min === Infinity) {
      river.length = 0;
      End = true;
    }
    for (const way of ways)
      if (way.value === min) {
        y = way.y;
        x = way.x;
        break;
      }
    river.push({ y, x });
  }
}

function getWays(matrix, { y, x }, river) {
  const ways = [
    { y: y - 1, x },
    { y: y + 1, x },
    { y, x: x - 1 },
    { y, x: x + 1 },
    { y, x },
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
