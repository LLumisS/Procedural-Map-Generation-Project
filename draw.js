'use strict';

const getColor = (percentage, filter) => {
  for (const layer of filter) {
    if (percentage <= layer.level) {
      const color = layer.color;
      const lightness = layer.lightness;
      const saturation = layer.saturation;

      const result = `hsl(${color}, ${saturation}%, ${lightness}%)`;
      return result;
    }
  }
};

function draw(matrix, filter) {
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, CANVAS_HEIGHT, CANVAS_WIDTH);

  ctx.beginPath();
  let y;
  let x;

  y = 0;
  for (const row of matrix) {
    x = 0;
    for (const pixel of row) {
      ctx.fillStyle = getColor(pixel, filter);
      ctx.fillRect(
        x * PIXEL_SIZE,
        y * PIXEL_SIZE,
        PIXEL_SIZE,
        PIXEL_SIZE
      );
      x++;
    }
    y++;
  }
  ctx.closePath();
}
