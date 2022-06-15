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

    const fieldTiles = fieldDef(this.matrix);
    const tiles = Math.pow(this.matrix.length, 2);
    const riversCoef = 1 - Math.abs(0.5 - fieldTiles.length / tiles);
    const riversCount = Math.floor(MAX_RIVERS_COUNT * riversCoef);

    this.rivers = riversGeneration(
      this.matrix,
      riversCount,
      fieldTiles
    );
  }
}


class MoistureMap extends Map {
  constructor(filter, rivers) {
    super(filter);

    this.matrix = randomNormalizedMatrix(GRIT_COEFFICIENT);
    extraMoistureByRivers(this.matrix, rivers);
    this.matrix = normalizeMatrix(this.matrix);
  }
}


class TemperatureMap extends Map {
  constructor(filter, heightMap) {
    super(filter);

    this.matrix = randomNormalizedMatrix(GRIT_COEFFICIENT);
    decreaseTemperatureByHeight(this.matrix, heightMap);
  }
}


class BiomMap extends Map {
  constructor(filter, heightFilter, heightMap, moistureMap, temperatureMap) {
    super(filter);

    this.matrix = biomDefinition(
      heightMap,
      moistureMap,
      temperatureMap);
    this.heightMap = heightMap;
    this.heightFilter = heightFilter;
  }

  draw() {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.height, canvas.width);

    ctx.beginPath();
    for (let y = 0; y < MATRIX_LENGTH; y++)
      for (let x = 0; x < MATRIX_LENGTH; x++) {
        const heightLevel = this.heightMap[y][x];
        if (heightLevel <= 0)
          ctx.fillStyle = getColor(heightLevel, this.heightFilter);
        else
          ctx.fillStyle = getBiomColor(this.matrix[y][x],
            heightLevel,
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
