'use strict';

class Map {
  constructor(filter) {
    this.filter = filter;
    this.cash = Array(MATRIX_LENGTH)
      .fill(null)
      .map(() => Array(MATRIX_LENGTH).fill(0));
    this.isCash = false;
  }
  
  draw() {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.height, canvas.width);
  
    ctx.beginPath();
    for (let y = 0; y < MATRIX_LENGTH; y++)
      for (let x = 0; x < MATRIX_LENGTH; x++) {
        ctx.fillStyle = getColor(this.matrix[y][x], this.filter);
        this.cash[y][x] = ctx.fillStyle; 
        ctx.fillRect(
          x * PIXEL_SIZE,
          y * PIXEL_SIZE,
          PIXEL_SIZE,
          PIXEL_SIZE
        );
      }
    ctx.closePath();

    this.isCash = true;
  }

  drawFromCash() {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.height, canvas.width);

    ctx.beginPath();
    for (let y = 0; y < MATRIX_LENGTH; y++)
      for (let x = 0; x < MATRIX_LENGTH; x++) {
        ctx.fillStyle = this.cash[y][x];
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

    this.matrix = randomNormalizedMatrix();
    for(let y = 0; y < MATRIX_LENGTH; y++)
      for (let x = 0; x < MATRIX_LENGTH; x++)
        this.matrix[y][x] -= (heightMap[y][x] > 0) ? (heightMap[y][x] / 3) : 0;

    this.matrix = normalizeMatrix(this.matrix);
  }
}


class BiomMap extends Map {
  constructor(filter, moistureMap, temperatureMap, heightMap) {
    super(filter);

    this.matrix = Array(MATRIX_LENGTH)
      .fill(null)
      .map(() => Array(MATRIX_LENGTH).fill(0));

    const beachLevel = 17;
    for(let y = 0; y < MATRIX_LENGTH; y++)
      for(let x = 0; x < MATRIX_LENGTH; x++) {
        for(const biom of BIOMS)
          if(moistureMap[y][x] <= biom.moisture && 
            temperatureMap[y][x] <= biom.temperature) {
            this.matrix[y][x] = biom.level;
            break;
          }
        if(heightMap[y][x] > 0 && 
          heightMap[y][x] <= 0.025 && 
          this.matrix[y][x] > 4) {
          this.matrix[y][x] = beachLevel;
          continue;
        }
      }
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
          ctx.fillStyle = getBiomColor(this.matrix[y][x], 
            MAP['PHYSICAL'].matrix[y][x], 
            this.filter, 
            LIGHTNESS_TABLE);
        this.cash[y][x] = ctx.fillStyle;
        ctx.fillRect(
          x * PIXEL_SIZE,
          y * PIXEL_SIZE,
          PIXEL_SIZE,
          PIXEL_SIZE
        );
      }
    ctx.closePath();

    this.isCash = true;
  }
}
