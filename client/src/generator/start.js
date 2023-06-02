import { FILTERS } from './consts';
import { HeightMap, MoistureMap, TemperatureMap, BiomMap } from './maps';
import { getSetting } from './helper';

export const MAP = {
  PHYSICAL: null,
  MOISTURE: null,
  TEMPERATURE: null,
  DEFAULT: null,
};

export function create() {
  const heightMap = new HeightMap(FILTERS.PHYSICAL);
  const moistureMap = new MoistureMap(
    FILTERS.MOISTURE,
    heightMap.rivers
  );
  const temperatureMap = new TemperatureMap(
    FILTERS.TEMPERATURE,
    heightMap.matrix
  );
  heightMap.digRivers();
  const defaultMap = new BiomMap(
    FILTERS.DEFAULT,
    FILTERS.PHYSICAL,
    heightMap.matrix,
    moistureMap.matrix,
    temperatureMap.matrix
  );

  MAP.PHYSICAL = heightMap;
  MAP.MOISTURE = moistureMap;
  MAP.TEMPERATURE = temperatureMap;
  MAP.DEFAULT = defaultMap;
}

export function apply(canvas, table, radioFilter) {
  const setting = getSetting(radioFilter);
  const map = MAP[setting];

  table.style.visibility = setting !== 'DEFAULT' ?
    'hidden' :
    'visible';

  map.draw(canvas);
}
