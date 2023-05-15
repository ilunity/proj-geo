import { Point } from '../components/Canvas/Canvas.types';
import { Params } from './init-params';
import { rgbToHex } from '@mui/material';

export const getPointColor = (point: Point, params: Params): string => {
  const { x, y } = point;
  const {
    XRMult, XGMult, XBMult,
    YRMult, YGMult, YBMult,
    RFree, GFree, BFree,
    div,
  } = params;

  const R = Math.round(Math.abs((x * XRMult - y * YRMult + RFree) / div)) % 256;
  const G = Math.round(Math.abs((x * XGMult - y * YGMult + GFree) / div)) % 256;
  const B = Math.round(Math.abs((x * XBMult - y * YBMult + BFree) / div)) % 256;

  return rgbToHex(`rgb(${R},${G},${B})`);
};
