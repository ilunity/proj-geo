import React, { useState } from 'react';
import { AppProps } from './App.types';
import { Canvas } from '../Canvas';
import { StyledApp } from './App.styles';
import { ColorForm } from '../ColorForm';
import { ColorFormInputs } from '../ColorForm/ColorForm.types';
import { getPointColor, initParams, toRGB } from '../../utils';
import { Point } from '../Canvas/Canvas.types';
import { CssBaseline, Stack, Typography } from '@mui/material';

const drawPath = (ctx: CanvasRenderingContext2D, points: Point[]) => {
  ctx.beginPath();
  ctx.fillStyle = '#000000';
  ctx.moveTo(points[0].x, points[0].y);
  ctx.lineTo(points[1].x, points[1].y);
  ctx.lineTo(points[2].x, points[2].y);
  ctx.closePath();
};

const drawGradient = (ctx: CanvasRenderingContext2D, points: Point[], colors: number[][]) => {
  const [p1, p2, p3] = points;
  const minX = Math.min(p1.x, p2.x, p3.x);
  const maxX = Math.max(p1.x, p2.x, p3.x);
  const minY = Math.min(p1.y, p2.y, p3.y);
  const maxY = Math.max(p1.y, p2.y, p3.y);

  const params = initParams(colors, points);

  for (let x = minX; x < maxX; x++) {
    for (let y = minY; y < maxY; y++) {
      if (ctx.isPointInPath(x, y)) {
        const color = getPointColor({ x, y }, params);

        ctx.fillStyle = color;
        ctx.fillRect(x, y, 1, 1);
      }
    }
  }

  ctx.stroke();
};

export const App: React.FC<AppProps> = () => {
  const [colors, setColors] = useState<number[][]>([[234, 99, 99], [137, 246, 13], [53, 112, 229]]);

  const handleColorsSubmit = (colors: ColorFormInputs) => {
    setColors(Object.values(colors).map(hex => toRGB(hex)));
  };

  const handleDraw = (ctx: CanvasRenderingContext2D, points: Point[]) => {
    drawPath(ctx, points);
    drawGradient(ctx, points, colors);
  };

  return (
    <>
      <CssBaseline />
      <StyledApp>
        <ColorForm onSubmit={handleColorsSubmit} />
        <Stack>
          <Typography color={'primary'} gutterBottom>
            2. Нарисуйте три точки
          </Typography>
          <Canvas draw={handleDraw} />
        </Stack>
      </StyledApp>
    </>
  );
};
