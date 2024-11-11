export type ElementType = 'task' | 'gateway' | 'event' | 'start' | 'end';

export interface Point {
  x: number;
  y: number;
}

export interface DiagramElement {
  id: string;
  type: ElementType;
  position: Point;
  label: string;
}

export interface Connection {
  id: string;
  source: string;
  target: string;
  label?: string;
}