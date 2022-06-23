'use strict';

function field(heightMap) {
  const fieldTiles = Array();
  const isField = ({ y, x }) => {
    if (heightMap[y][x] > WATER_LEVEL)
      fieldTiles.push({ y, x });
  };

  bypassing(heightMap, isField);

  return fieldTiles;
}

function cold(temperatureMap, heightMap) {
  const decrease = ({ y, x }) => {
    temperatureMap[y][x] -= (heightMap[y][x] > WATER_LEVEL) ?
      (heightMap[y][x] * HEIGHT_IMPACT) :
      0;
  };

  bypassing(temperatureMap, decrease);
}

function bioms(heightMap, moistureMap, temperatureMap) {
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
        biomMap[y][x] = biom.id;
        break;
      }
    }
  };

  bypassing(biomMap, getBiom);

  return biomMap;
}
