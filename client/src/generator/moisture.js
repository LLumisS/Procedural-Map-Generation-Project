import { EXTRA_MOISTURE, RIVERS_WET_RADIUS } from './consts';
import { bypassing } from './helper';

export function riversMoisture(moistureMap, rivers) {
  for (const river of rivers)
    for (const tile of river)
      tileMoisture(moistureMap, tile);
}

function tileMoisture(moistureMap, tile) {
  const extraMoisture = ({ y, x }) => {
    if (moistureMap[y]?.[x] !== undefined)
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
