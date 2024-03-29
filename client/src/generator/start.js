import { FILTERS } from './consts';
import { HeightMap, MoistureMap, TemperatureMap, BiomMap } from './maps';

export const MAP = {
  Physical: null,
  Moisture: null,
  Temperature: null,
  Default: null,
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

  MAP.Physical = heightMap;
  MAP.Moisture = moistureMap;
  MAP.Temperature = temperatureMap;
  MAP.Default = defaultMap;
}
