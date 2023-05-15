import React, { useEffect, useRef, useState } from 'react';
import { CanvasProps, Point } from './Canvas.types';
import { Wrapper } from './Canvas.styles';

export const Canvas: React.FC<CanvasProps> = ({ draw }) => {
  const canvasRef = useRef<HTMLCanvasElement>({} as HTMLCanvasElement);
  const [points, setPoints] = useState<Point[]>([]);

  const getMousePos = (canvas: HTMLCanvasElement, event: React.MouseEvent<HTMLCanvasElement>) => {
    const rect = canvas.getBoundingClientRect();
    return { x: event.clientX - rect.left, y: event.clientY - rect.top };
  };

  const handleClick = (event: React.MouseEvent<HTMLCanvasElement>) => {
    const { x, y } = getMousePos(canvasRef.current, event);
    const ctx = canvasRef.current.getContext('2d') as CanvasRenderingContext2D;
    ctx.fillStyle = '#000000';
    ctx.fillRect(x, y, 1, 1);

    setPoints(prevState => [...prevState, { x: Math.round(x), y: Math.round(y) }]);
  };

  useEffect(() => {
    const ctx = canvasRef.current.getContext('2d') as CanvasRenderingContext2D;

    if (points.length === 3) {
      draw(ctx, points);
      setPoints([]);
    }
  }, [points]);

  return (
    <Wrapper>
      <canvas
        ref={canvasRef}
        width={700}
        height={500}
        onClick={handleClick}
      />
    </Wrapper>
  );
};
