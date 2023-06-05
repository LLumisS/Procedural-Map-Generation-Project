import { HEIGHT_IMPACT, WATER_LEVEL, MATRIX_LENGTH, BIOMS } from './consts';
import { bypassing } from './helper';

export function field(heightMap) {
  const fieldTiles = [];

  bypassing(heightMap, ({ y, x }) => {
    if (heightMap[y][x] > WATER_LEVEL) {
      fieldTiles.push({ y, x });
    }
  });

  return fieldTiles;
}

export function cold(temperatureMap, heightMap) {
  bypassing(temperatureMap, ({ y, x }) => {
    temperatureMap[y][x] -= heightMap[y][x] > WATER_LEVEL ?
      heightMap[y][x] * HEIGHT_IMPACT :
      0;
  });
}

export function bioms(heightMap, moistureMap, temperatureMap) {
  const biomMap = Array.from({ length: MATRIX_LENGTH }, () =>
    Array(MATRIX_LENGTH).fill(0)
  );

  bypassing(biomMap, ({ y, x }) => {
    for (const biom of BIOMS) {
      const enough = {
        moisture: moistureMap[y][x] <= biom.moisture,
        temperature: temperatureMap[y][x] <= biom.temperature,
        height: heightMap[y][x] > biom.heightFrom &&
          heightMap[y][x] <= biom.heightTo,
      };
      if (enough.moisture && enough.temperature && enough.height) {
        biomMap[y][x] = biom.id;
        break;
      }
    }
  });

  return biomMap;
}
