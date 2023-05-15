import { Point } from '../components/Canvas/Canvas.types';

const calcMult = (tone: number[], points: Point[], axis: 'x' | 'y') => {
  return (
    tone[0] * (points[1][axis] - points[2][axis]) -
    tone[1] * (points[0][axis] - points[2][axis]) +
    tone[2] * (points[0][axis] - points[1][axis])
  );
};


const calcFreeTerm = (tone: number[], points: Point[]) => {
  return (
    tone[0] * (points[1].x * points[2].y - points[2].x * points[1].y) -
    tone[1] * (points[0].x * points[2].y - points[2].x * points[0].y) +
    tone[2] * (points[0].x * points[1].y - points[1].x * points[0].y)
  );
};

export interface Params {
  div: number,
  YGMult: number,
  XRMult: number,
  XGMult: number,
  GFree: number,
  XBMult: number,
  RFree: number,
  BFree: number,
  YRMult: number,
  YBMult: number
}

export const initParams = (colors: number[][], points: Point[]): Params => {
  const R: number[] = [], G: number[] = [], B: number[] = [];
  for (let i = 0; i < 3; i++) {
    R.push(colors[i][0]);
    G.push(colors[i][1]);
    B.push(colors[i][2]);
  }

  const div = -(
    points[0].x * points[1].y +
    points[1].x * points[2].y +
    points[2].x * points[0].y -
    points[2].x * points[1].y -
    points[0].x * points[2].y -
    points[1].x * points[0].y
  );

  const XRMult = calcMult(R, points, 'y');
  const XGMult = calcMult(G, points, 'y');
  const XBMult = calcMult(B, points, 'y');

  const YRMult = calcMult(R, points, 'x');
  const YGMult = calcMult(G, points, 'x');
  const YBMult = calcMult(B, points, 'x');

  const RFree = calcFreeTerm(R, points);
  const GFree = calcFreeTerm(G, points);
  const BFree = calcFreeTerm(B, points);

  return {
    div,
    XRMult, XGMult, XBMult,
    YRMult, YGMult, YBMult,
    RFree, GFree, BFree,
  };
};
