export interface CanvasProps {
  draw: (context: CanvasRenderingContext2D, points: Point[]) => void;
}

export interface Point {
  x: number;
  y: number;
}
