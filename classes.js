'use strict';

class Map {
  constructor(filter) {
    this.filter = filter;
  }
  
  draw() {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.height, canvas.width);
  
    ctx.beginPath();
    for (let y = 0; y < MATRIX_LENGTH; y++)
      for (let x = 0; x < MATRIX_LENGTH; x++) {
        ctx.fillStyle = getColor(this.matrix[y][x], this.filter);
        ctx.fillRect(
          x * PIXEL_SIZE,
          y * PIXEL_SIZE,
          PIXEL_SIZE,
          PIXEL_SIZE
        );
      }
    ctx.closePath();
  }
}
  
class HeightMap extends Map {
  constructor(filter) {
    super(filter);
    this.matrix = randomNormalizedMatrix();
    riversGeneration(this.matrix, RIVERS_COUNT);
  }
}
  
class MoistureMap extends Map {
  constructor(filter, heightMap) {
    super(filter);
    this.matrix = randomNormalizedMatrix();
    extraMoistureByRivers(this.matrix, heightMap);
  }
}
  
class TemperatureMap extends Map {
  constructor(filter, heightMap) {
    super(filter);

    const tempratureRandom = randomNormalizedMatrix();
    for(let y = 0; y < MATRIX_LENGTH; y++)
      for (let x = 0; x < MATRIX_LENGTH; x++)
        tempratureRandom[y][x] -= (heightMap[y][x] > 0) ? (heightMap[y][x] / 4) : 0;

    this.matrix = normalizeMatrix(tempratureRandom);
  }
}
  
class BiomMap extends Map {
  constructor(filter, moistureMap, temperatureMap) {
    super(filter);

    const biomMap = Array(MATRIX_LENGTH).fill(null).map(() => Array(MATRIX_LENGTH).fill(0));
    for(let y = 0; y < MATRIX_LENGTH; y++)
      for(let x = 0; x < MATRIX_LENGTH; x++)
        for(const biom of BIOMS)
          if(moistureMap[y][x] <= biom.moisture && temperatureMap[y][x] <= biom.temperature) {
            biomMap[y][x] = biom.level;
            break;
          }

  this.matrix = biomMap;
  }

  draw() {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.height, canvas.width);
  
    ctx.beginPath();
    for (let y = 0; y < MATRIX_LENGTH; y++)
      for (let x = 0; x < MATRIX_LENGTH; x++) {
        const heightLevel = MAP['PHYSICAL'].matrix[y][x];
        if (heightLevel <= 0)
          ctx.fillStyle = getColor(heightLevel, FILTERS.PHYSICAL);
        else
          ctx.fillStyle = getColor(this.matrix[y][x], this.filter);
        ctx.fillRect(
          x * PIXEL_SIZE,
          y * PIXEL_SIZE,
          PIXEL_SIZE,
          PIXEL_SIZE
        );
      }
    ctx.closePath();
  }
}
  