import React, { useRef, useEffect } from 'react';
import { MAP } from '../generator/start';
import { WIDTH, HEIGHT } from '../generator/consts';

const CanvasComponent = ({ selectedFilter, trigger }) => {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    MAP[selectedFilter].draw(canvas);
  }, [selectedFilter, trigger]);

  return (
    <canvas
      ref={canvasRef}
      width={WIDTH}
      height={HEIGHT}
      style={{ display: 'block', boxSizing: 'border-box' }}
    />
  );
};

export default CanvasComponent;
