import { EXTRA_MOISTURE, RIVERS_WET_RADIUS } from './consts';
import { bypassing } from './helper';

export function riversMoisture(moistureMap, rivers) {
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
    const init = {
      startY: tile.y - radius,
      startX: tile.x - radius,
      endY: tile.y + radius,
      endX: tile.x + radius,
    };

    bypassing(moistureMap, extraMoisture, init);
  }
}
