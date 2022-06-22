'use strict';

class Map {
  constructor(filter) {
    this.filter = filter;

    this.cash = Array(MATRIX_LENGTH)
      .fill(null)
      .map(() => Array(MATRIX_LENGTH).fill(0));
    this.hasCash = false;

    this.cbStd = ({ y, x }, ctx) => {
      ctx.fillStyle = color(this.matrix[y][x], this.filter);
      this.cash[y][x] = ctx.fillStyle;
    };
    this.cbCash = ({ y, x }, ctx) => {
      ctx.fillStyle = this.cash[y][x];
    };
  }

  draw() {
    const ctx = canvas.getContext('2d');
    ctx.clearRect(0, 0, canvas.height, canvas.width);

    this.callback = this.hasCash ?
      this.cbCash :
      this.cbStd;

    const colorize = ({ y, x }) => {
      this.callback({ y, x }, ctx);
      ctx.fillRect(
        x * PIXEL_SIZE,
        y * PIXEL_SIZE,
        PIXEL_SIZE,
        PIXEL_SIZE
      );
    };

    ctx.beginPath();
    bypassing(colorize, this.matrix);
    ctx.closePath();

    this.hasCash = true;
  }
}

class HeightMap extends Map {
  constructor(filter) {
    super(filter);

    this.matrix = randomMatrix();

    const fieldTiles = field(this.matrix);
    const tiles = Math.pow(this.matrix.length, 2);
    const riversCoef = 1 - Math.abs(0.5 - fieldTiles.length / tiles);
    const riversCount = Math.floor(MAX_RIVERS_COUNT * riversCoef);

    this.rivers = getRivers(
      this.matrix,
      riversCount,
      fieldTiles
    );
  }

  digRivers() {
    for (const river of this.rivers)
      for (const tile of river)
        this.matrix[tile.y][tile.x] = WATER_LEVEL;
  }
}

class MoistureMap extends Map {
  constructor(filter, rivers) {
    super(filter);

    this.matrix = randomMatrix(GRIT_COEFFICIENT);
    riversMoisture(this.matrix, rivers);
    this.matrix = normalize(this.matrix);
  }
}

class TemperatureMap extends Map {
  constructor(filter, heightMap) {
    super(filter);

    this.matrix = randomMatrix(GRIT_COEFFICIENT);
    cold(this.matrix, heightMap);
    this.matrix = normalize(this.matrix);
  }
}

class BiomMap extends Map {
  constructor(filter, heightFilter, heightMap, moistureMap, temperatureMap) {
    super(filter);

    this.matrix = bioms(
      heightMap,
      moistureMap,
      temperatureMap
    );

    this.cbStd = ({ y, x }, ctx) => {
      const heightLevel = heightMap[y][x];
      if (heightLevel <= WATER_LEVEL)
        ctx.fillStyle = color(heightLevel, heightFilter);
      else
        ctx.fillStyle = biomColor(
          this.matrix[y][x],
          heightLevel,
          this.filter,
          LIGHTNESS_TABLE
        );
      this.cash[y][x] = ctx.fillStyle;
    };
  }
}
