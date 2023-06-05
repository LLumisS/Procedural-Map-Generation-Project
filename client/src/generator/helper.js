export const random = (min, max) =>
  Math.floor(Math.random() * (max - min + 1) + min);

export const average = (...argArray) => {
  const validArgs = argArray.filter(arg => !isNaN(arg) && arg !== null);
  const sum = validArgs.reduce((acc, curr) => acc + curr, 0);
  return validArgs.length > 0 ? sum / validArgs.length : 0;
};

export const min = (...argArray) => {
  const validArgs = argArray.filter(arg => !isNaN(arg) && arg !== null);
  return Math.min(...validArgs);
};

export const includes = (array, tile) =>
  array.some(pixel => pixel.y === tile.y && pixel.x === tile.x);

export function averageRandom(matrix, elements, randomRange) {
  const values = elements.map(elem => {
    const { x, y } = elem;
    elem.value = matrix[y]?.[x] || null;
    return elem.value;
  });

  return average(...values) + random(-randomRange, randomRange);
}

export const bypassing = (
  matrix,
  callback,
  init = {}
) => {
  const initDefault = {
    startY: 0,
    startX: 0,
    endY: matrix.length,
    endX: matrix.length,
    incY: 1,
    incX: 1,
  };
  const mergedInit = { ...initDefault, ...init };

  for (let y = mergedInit.startY; y < mergedInit.endY; y += mergedInit.incY) {
    for (let x = mergedInit.startX; x < mergedInit.endX; x += mergedInit.incX) {
      callback({ y, x });
    }
  }
};
